<?php

namespace App\Services\Application;

use App\Services\Applicant\FileService;

class ApplicationService
{
    public function __construct(protected FileService $fileService)
    {
    }

    public function applyJob(array $data, $jobposting, $user)
    {
        // check if the job status is open
        if ($jobposting->status !== 'open') {
            return null;
        }
        // add the job posting id
        $data['job_posting_id'] = $jobposting->id;
        // create application
        $applicationData = collect($data)->except(['resume', 'coverletter'])->toArray();
        $application = $user->applicant->application()->create($applicationData);
        // create application status
        $this->updateApplicationStatus($application, 'received');
        // upload application files
        $this->fileService->handleApplicationUpload(['file' => $data['resume']], $user, 'resume', $application);
        $this->fileService->handleApplicationUpload(['file' => $data['coverletter']], $user, 'coverletter', $application);

        return ['message' => 'Application submitted successfully!'];
    }

    private function updateApplicationStatus($application, $status)
    {
        $application->applicationStatus()->create(['status' => $status]);
    }
}
