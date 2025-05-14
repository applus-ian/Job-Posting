<?php

namespace App\Services\Interview;

class InterviewFeedbackService
{
    public function createFeedback(array $data, $interview)
    {
        $interview->feedback()->create($data);
        return ['message' => 'Interview feedback added successfully!'];
    }

    public function updateFeedback(array $data, $interview, $feedback)
    {
        if ($feedback->interview_id !== $interview->id) {
            return null;
        }
        $feedback->update($data);
        return ['message' => 'Interview feedback updated successfully!'];
    }

    public function deleteFeedback($interview, $feedback)
    {
        if ($feedback->interview_id !== $interview->id) {
            return null;
        }
        $feedback->delete();
        return ['message' => 'Interview feedback deleted successfully!'];
    }
}
