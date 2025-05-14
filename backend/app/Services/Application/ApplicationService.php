<?php

namespace App\Services\Application;

use App\Services\Applicant\FileService;

class ApplicationService
{
    public function __construct(protected FileService $fileService)
    {
    }

    public function viewApplication($application)
    {
        // update to reviewed if the status is still received
        if ($application->status === 'received') {
            $this->updateApplicationStatus(['status' => 'reviewed'], $application);
        }
        return $application;
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
        $this->updateApplicationStatusTimeline(['status' => 'received'], $application);
        // upload application files
        $this->fileService->handleApplicationUpload(['file' => $data['resume']], $user, 'resume', $application);
        $this->fileService->handleApplicationUpload(['file' => $data['coverletter']], $user, 'coverletter', $application);

        return ['message' => 'Application submitted successfully!'];
    }

    public function updateApplicationStatus(array $data, $application)
    {
        $application->update(['status' => $data['status']]);
        $this->updateApplicationStatusTimeline($data, $application);
        return ['message' => 'Application updated to ' . $data['status'] . '.'];
    }

    private function updateApplicationStatusTimeline(array $data, $application)
    {
        $application->applicationStatus()->create($data);
    }
}
