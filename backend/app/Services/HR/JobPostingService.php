<?php

namespace App\Services\HR;

use App\Models\JobPosting;

class JobPostingService
{
    public function createJobPosting(array $data)
    {
        // create job posting
        $jobposting = JobPosting::create($data);
        // If tags are passed in the request
        if (array_key_exists('tags', $data)) {
            // add new tags
            if (!empty($data['tags'])) {
                $this->createTags($jobposting, $data['tags']);
            }
        }

        return [
            'message' => $jobposting->status === 'draft'
                ? 'Job saved as a draft. You can publish it later.'
                : 'Job posted successfully and is now open!'
        ];
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
