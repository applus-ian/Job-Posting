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
        $this->validateSchedule($data['schedule_date'], $data['schedule_time']);

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
        $this->validateSchedule($data['schedule_date'], $data['schedule_time'], $interview->id);
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

    private function validateSchedule(string $scheduleDate, string $scheduleTime, int $ignoreId = null): void
    {
        $query = Interview::where('schedule_date', $scheduleDate)
            ->where('schedule_time', $scheduleTime);

        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        if ($query->exists()) {
            throw new \Exception('The selected time is already taken by another scheduled interview for another applicant.');
        }

        $targetTimestamp = strtotime($scheduleTime);

        $conflicts = Interview::where('schedule_date', $scheduleDate)
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
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
    }

}
