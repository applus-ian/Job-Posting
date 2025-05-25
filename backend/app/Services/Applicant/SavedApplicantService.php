<?php

namespace App\Services\Applicant;

use App\Models\SavedApplicant;

class SavedApplicantService
{

    public function getSavedApplicants()
    {
        $savedApplicants = SavedApplicant::with(['applicant', 'jobPosting'])->get();
        return [
            'savedapplicants' => $savedApplicants,
            'applicants' => $savedApplicants->pluck('applicant')->filter()->values(),
        ];

    }

    public function saveApplicant($applicant, $jobposting)
    {
        $alreadySaved = SavedApplicant::where('applicant_id', $applicant->id)
            ->where('job_posting_id', $jobposting->id)
            ->exists();

        if ($alreadySaved)
            return null;

        $savedApplicant = SavedApplicant::create([
            'applicant_id' => $applicant->id,
            'job_posting_id' => $jobposting->id,
        ]);

        return ['message' => 'Applicant added to shortlisted!', 'savedapplicant' => $savedApplicant];
    }

    public function unsaveApplicant($saveapplicant)
    {
        $saveapplicant->delete();

        return ['message' => 'Applicant removed from the shortlisted!'];
    }
}
