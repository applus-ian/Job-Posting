<?php

namespace App\Services\Application;

use App\Models\Application;
use App\Models\SavedApplicant;
use App\Services\Applicant\FileService;

class ApplicationService
{
    public function __construct(protected FileService $fileService)
    {
    }

    public function getApplicantApplications($applicant)
    {
        return ['applications' => $applicant->application()->with(['jobPosting', 'applicationStatus'])->get()];
    }

    public function viewApplication($application)
    {
        # uncomment after hr user is integrated
        // update to reviewed if the status is still received
        // if ($application->status === 'received') {
        //     $this->updateApplicationStatus(['status' => 'reviewed'], $application);
        // } $isSaved = false;
        $applicant = $application->applicant;
        $jobposting = $application->jobPosting;
        $isSaved = false;
        $savedApplicantId = null;
        if ($applicant && $jobposting) {
            $savedApplicant = SavedApplicant::where('applicant_id', $applicant->id)
                ->where('job_posting_id', $jobposting->id)
                ->first();

            if ($savedApplicant) {
                $isSaved = true;
                $savedApplicantId = $savedApplicant->id;
            }
        }
        return [
            'applicant' => $application->applicant()->with('user')->first(),
            'application' => $application,
            'application_status' => $application->applicationStatus,
            'interview' => $application->interview()->with('feedback')->first(),
            'jobposting' => $application->jobPosting,
            'documents' => $application->document,
            'is_saved' => $isSaved,
            'saved_applicant_id' => $savedApplicantId
        ];
    }

    public function viewAllApplication()
    {
        return ['applications' => Application::with(['applicant', 'applicant.user', 'applicationStatus', 'jobPosting'])->get()];
    }

    public function applyJob(array $data, $jobposting, $user)
    {
        // check if the job status is open or the jobposting has 0 vacancies
        if ($jobposting->status !== 'open' || $jobposting->vacancies <= 0) {
            return null;
        }
        // add the job posting id
        $data['job_posting_id'] = $jobposting->id;
        // create application
        $applicationData = collect($data)->except(['resume', 'coverletter'])->toArray();
        $application = $user->applicant->application()->create($applicationData);
        // Decrement vacancies by 1
        $jobposting->decrement('vacancies');
        // create application status
        $this->updateApplicationStatusTimeline(['status' => 'received'], $application);
        // upload application files
        $this->fileService->handleApplicationUpload(['file' => $data['resume']], $user, 'resume', $application);
        $this->fileService->handleApplicationUpload(['file' => $data['coverletter']], $user, 'coverletter', $application);

        return ['message' => 'Application submitted successfully!', 'application' => $application];
    }

    public function updateApplicationStatus(array $data, $application)
    {
        $application->update(['status' => $data['status']]);
        $this->updateApplicationStatusTimeline($data, $application);
        return ['message' => 'Application updated to ' . $data['status'] . '.', 'application' => $application];
    }

    public function updateApplicationStatusTimeline(array $data, $application)
    {
        $latestStatus = $application->applicationStatus()->latest()->first();

        if ($latestStatus && $latestStatus->status === $data['status']) {
            $latestStatus->update($data);
        } else {
            $application->applicationStatus()->create($data);
        }
    }
}
