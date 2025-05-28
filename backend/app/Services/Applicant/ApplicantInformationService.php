<?php

namespace App\Services\Applicant;

use App\Models\Applicant;
use App\Models\Document;

class ApplicantInformationService
{
    public function getApplicantInformation($user_id, $getDefaultDocuments = false, $getApplication = false)
    {
        $applicant = Applicant::with(['user', 'workExperience', 'educationHistory', 'language', 'emergencyContact'])->where('user_id', $user_id)->firstOrFail();

        $documents = $getDefaultDocuments
            ? Document::where('applicant_id', $applicant->id)->whereNull('application_id')->get()
            : Document::where('applicant_id', $applicant->id)->get();

        $applications = $getApplication
            ? $applicant->application()->with('jobPosting')->get()
            : collect();


        return ['applicant' => $applicant, 'address' => $applicant->address, 'documents' => $documents, 'applications' => $applications];
    }

    public function updateInformation(array $data, $applicant)
    {
        $applicant->update($data);
        return ['applicant' => $applicant, 'message' => 'Your personal information is updated successfully!'];
    }

}
