<?php

namespace App\Services\Applicant;

use App\Models\Applicant;
use App\Models\Document;

class ApplicantInformationService
{
    public function getApplicantInformation($user_id)
    {
        $applicant = Applicant::with(['workExperience', 'educationHistory', 'language', 'emergencyContact'])->where('user_id', $user_id)->firstOrFail();
        $documents = Document::where('applicant_id', $applicant->id)->whereNull('application_id')->get();

        return ['applicant' => $applicant, 'address' => $applicant->address, 'documents' => $documents];
    }

    public function updateInformation(array $data, $applicant)
    {
        $applicant->update($data);
        return ['applicant' => $applicant, 'message' => 'Your personal information is updated successfully!'];
    }

}
