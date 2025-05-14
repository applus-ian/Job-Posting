<?php

namespace App\Services\Interview;

class InterviewScheduleService
{
    public function createInterviewSchedule(array $data, $application)
    {
        $application->update(['status' => 'interview']);
        $application->interview()->create($data);
        return ['message' => 'Interview scheduled successfully!'];
    }

    public function updateInterviewSchedule(array $data, $interview)
    {
        $interview->update($data);
        return ['message' => 'Interview details updated successfully!'];
    }
}
