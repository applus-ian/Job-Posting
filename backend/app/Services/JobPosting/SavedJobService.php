<?php

namespace App\Services\JobPosting;

use App\Models\JobPosting;
use Illuminate\Support\Facades\Auth;

class SavedJobService
{
    public function getSavedJobPosting()
    {
        $applicant = Auth::user()->applicant;

        // get all saved job id
        $savedJobPostingIds = $applicant->savedJob()->pluck('job_posting_id');
        // get jobposting that are saved
        $savedJobPostings = JobPosting::whereIn('id', $savedJobPostingIds)
            ->with('applications')
            ->where('status', 'open')
            ->get();

        return [
            'savedjobs' => $applicant->savedJob()->get(),
            'jobpostings' => $savedJobPostings
        ];
    }

    public function saveJobPosting($jobposting)
    {
        $applicant = Auth::user()->applicant;

        $alreadySaved = $applicant->savedJob()
            ->where('job_posting_id', $jobposting->id)
            ->exists();
        if ($alreadySaved)
            return null;

        $savedJob = $applicant->savedJob()->create(['job_posting_id' => $jobposting->id]);
        return ['message' => 'Job saved successfully!', 'savedjob' => $savedJob];
    }

    public function unsaveJobPosting($savejob)
    {
        $applicant = Auth::user()->applicant;

        if ($savejob->applicant_id !== $applicant->id) {
            return null;
        }

        $savejob->delete();

        return ['message' => 'Job unsaved successfully!'];
    }
}
