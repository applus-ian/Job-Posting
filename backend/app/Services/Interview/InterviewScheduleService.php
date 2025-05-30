<?php

namespace App\Services\Interview;

use App\Models\Interview;
use App\Services\Application\ApplicationService;

class InterviewScheduleService
{
    public function __construct(protected ApplicationService $applicationService)
    {
    }

    public function createInterviewSchedule(array $data, $application)
    {
        $scheduleDate = $data['schedule_date']; // format: 'YYYY-MM-DD'
        $scheduleTime = $data['schedule_time']; // format: 'HH:MM:SS'

        $exists = \App\Models\Interview::where('schedule_date', $scheduleDate)
                    ->where('schedule_time', $scheduleTime)
                    ->exists();

        if ($exists) {
            throw new \Exception('The selected time is already taken by another scheduled interview for another applicant.');
        }

        $targetTimestamp = strtotime($scheduleTime);

        $interviews = \App\Models\Interview::where('schedule_date', $scheduleDate)
            ->whereBetween('schedule_time', [
                date('H:i:s', $targetTimestamp - 1800), 
                date('H:i:s', $targetTimestamp + 1800), 
            ])
            ->get();

        foreach ($interviews as $interview) {
            $existingTimestamp = strtotime($interview->schedule_time);
            $differenceInMinutes = abs($targetTimestamp - $existingTimestamp) / 60;

            if ($differenceInMinutes < 30) {
                $conflictTime = date('g:i A', strtotime($interview->schedule_time));
                $suggestedTime = date('g:i A', strtotime($interview->schedule_time) + 1800); 

                throw new \Exception(
                    "The selected time is too close to another interview scheduled at {$conflictTime}. " .
                    "Please choose a time after {$suggestedTime}."
                );
            }
        }

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
        $scheduleDate = $data['schedule_date'];
        $scheduleTime = $data['schedule_time'];
        $targetTimestamp = strtotime($scheduleTime);

        // 1. Check for exact match — excluding the current interview
        $exists = \App\Models\Interview::where('schedule_date', $scheduleDate)
                    ->where('schedule_time', $scheduleTime)
                    ->where('id', '!=', $interview->id)
                    ->exists();

        if ($exists) {
            throw new \Exception('The selected time is already taken by another scheduled interview for another applicant.');
        }

        // 2. Check for 30-minute buffer — excluding the current interview
        $conflicts = \App\Models\Interview::where('schedule_date', $scheduleDate)
            ->where('id', '!=', $interview->id)
            ->whereBetween('schedule_time', [
                date('H:i:s', $targetTimestamp - 1800),
                date('H:i:s', $targetTimestamp + 1800),
            ])
            ->get();

        foreach ($conflicts as $conflict) {
            $existingTimestamp = strtotime($conflict->schedule_time);
            $differenceInMinutes = abs($targetTimestamp - $existingTimestamp) / 60;

            if ($differenceInMinutes < 30) {
                $conflictTime = date('g:i A', strtotime($conflict->schedule_time));
                $suggestedTime = date('g:i A', strtotime($conflict->schedule_time) + 1800);

                throw new \Exception(
                    "The selected time is too close to another interview scheduled at {$conflictTime}. " .
                    "Please choose a time after {$suggestedTime}."
                );
            }
        }

        // 3. Proceed with update
        $interview->update($data);

        return [
            'message' => 'Interview details updated successfully!',
            'application' => $interview->application,
        ];
    }



    public function getInterviewSchedule()
    {
        $interviews = Interview::with(['application', 'application.applicant.user', 'application.jobPosting'])->get();
        return ['interviews' => $interviews];
    }
}
