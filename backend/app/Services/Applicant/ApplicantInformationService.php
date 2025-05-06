<?php

namespace App\Services\Applicant;

use App\Models\Applicant;

class ApplicantInformationService
{
    public function getApplicantInformation($user_id)
    {
        $applicant = Applicant::with(['workExperience', 'educationHistory'])->where('user_id', $user_id)->firstOrFail();
        return ['applicant' => $applicant];
    }

    public function updateInformation(array $data, $applicant)
    {
        $applicant->update($data);
        return ['message' => 'Your personal information is updated successfully!'];
    }
}
