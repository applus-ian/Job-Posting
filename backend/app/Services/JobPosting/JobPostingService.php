<?php

namespace App\Services\JobPosting;

use App\Models\JobPosting;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class JobPostingService
{
    public function fetchJobPostings($status = null)
    {
        $query = JobPosting::with('applications');

        if ($status !== null) {
            $query->where('status', $status);
        }

        return ['jobpostings' => $query->get()];
    }

    public function fetchJobPostingWithSaved()
    {
        $applicant = Auth::user()->applicant;

        return [
            'jobpostings' => JobPosting::with('applications')->where('status', 'open')->get(),
            'savedjobs' => $applicant->savedJob()->get(),
        ];
    }

    public function createJobPosting(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Create the Address first
            $address = Address::create([
                'address' => $data['address'],
                'country' => $data['country'],
                'province' => $data['province'],
                'city' => $data['city'],
                'street' => $data['street'],
                'zipcode' => $data['zipcode'],
            ]);

            // Set the address_id on job posting data
            $data['address_id'] = $address->id;

            // Remove address fields from $data so they don't interfere with JobPosting::create()
            unset(
                $data['address'],
                $data['country'],
                $data['province'],
                $data['city'],
                $data['street'],
                $data['zipcode']
            );

            // Now create job posting with address_id
            $jobposting = JobPosting::create($data);

            // Handle tags if any
            if (array_key_exists('tags', $data) && !empty($data['tags'])) {
                $this->createTags($jobposting, $data['tags']);
            }

            return [
                'message' => $jobposting->status === 'draft'
                    ? 'Job saved as a draft. You can publish it later.'
                    : 'Job posted successfully and is now open!'
            ];
        });
    }


    public function updateJobPosting(array $data, $jobposting)
    {
        // update job posting
        $jobposting->update($data);

        // If tags are passed in the request
        if (array_key_exists('tags', $data)) {
            // delete old tags
            $jobposting->tags()->delete();
            // add new tags
            if (!empty($data['tags'])) {
                $this->createTags($jobposting, $data['tags']);
            }
        }
        return ['message' => 'Job posted updated successfully!'];
    }


    public function deleteJobPosting($jobposting)
    {
        // check if jobposting exists && check owner of the jobposting
        if (!$jobposting) {
            return null;
        }

        $jobposting->delete();
        return ['message' => 'Job posted deleted successfully!'];
    }

    private function createTags($jobposting, array $tags)
    {
        foreach ($tags as $tag) {
            $jobposting->tags()->create(['tag' => $tag]);
        }
    }
}
