<?php

namespace App\Services\Applicant;

use Illuminate\Support\Facades\Auth;

class EducationHistoryService
{
    public function createEducationHistory(array $data, $user)
    {
        $user->applicant->educationHistory()->create($data);
        return ['message' => 'Education history added successfully!'];
    }

    public function updateEducationHistory(array $data, $educationhistory)
    {
        $educationhistory->update($data);
        return ['message' => 'Education history updated successfully!'];
    }

    public function deleteEducationHistory($educationhistory)
    {
        // check if educationhistory exists && check owner of the educationhistory
        if (!$educationhistory || $educationhistory->applicant->user_id !== Auth::id()) {
            return null;
        }

        $educationhistory->delete();
        return ['message' => 'Education history deleted successfully!'];
    }
}
