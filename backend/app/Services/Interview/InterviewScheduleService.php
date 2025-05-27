<?php

namespace App\Services\Interview;

use App\Services\Application\ApplicationService;

class InterviewScheduleService
{
    public function __construct(protected ApplicationService $applicationService)
    {
    }

    public function createInterviewSchedule(array $data, $application)
    {
        $application->status = 'interview';
        $application->save();
        $application->interview()->create($data);
        $this->applicationService->updateApplicationStatusTimeline(['status' => 'interview'], $application);

        return [
            'message' => 'Interview scheduled successfully!',
            'application' => $application
        ];
    }

    public function updateInterviewSchedule(array $data, $interview)
    {
        $interview->update($data);
        return [
            'message' => 'Interview details updated successfully!',
            'application' => $interview->application,
        ];
    }
}
