<?php

namespace App\Services\Applicant;

use App\Models\WorkExperience;
use Illuminate\Support\Facades\Auth;

class WorkExperienceService
{
    public function createWorkExperience(array $data, $user)
    {
        $user->applicant->workExperience()->create($data);
        return ['message' => 'Work experience added successfully!'];
    }

    public function updateWorkExperience(array $data, $workexperience)
    {
        $workexperience->update($data);
        return ['message' => 'Work experience updated successfully!'];
    }

    public function deleteWorkExperience($workexperience)
    {
        // check if workExperience exists && check owner of the workExperience
        if (!$workexperience || $workexperience->applicant->user_id !== Auth::id()) {
            return null;
        }

        $workexperience->delete();
        return ['message' => 'Work experience deleted successfully!'];
    }
}
