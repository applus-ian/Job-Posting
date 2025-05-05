<?php

namespace App\Services\Applicant;

class ApplicantInformationService
{
    public function updateInformation(array $data, $applicant)
    {
        $applicant->update($data);
        return ['message' => 'Your personal information is updated successfully!'];
    }
}
