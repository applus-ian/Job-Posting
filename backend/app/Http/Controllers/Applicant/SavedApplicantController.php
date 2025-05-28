<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\DeleteMultipleSavedApplicantsRequest;
use App\Models\Applicant;
use App\Models\JobPosting;
use App\Models\SavedApplicant;
use App\Services\Applicant\SavedApplicantService;
use Illuminate\Http\Request;

class SavedApplicantController extends Controller
{
    public function __construct(protected SavedApplicantService $savedApplicantService)
    {
    }

    public function index()
    {
        $data = $this->savedApplicantService->getSavedApplicants();
        return response()->json($data, 201);
    }

    public function store(Applicant $applicant, JobPosting $jobposting)
    {
        $data = $this->savedApplicantService->saveApplicant($applicant, $jobposting);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }

        return response()->json($data, 201);
    }

    public function destroy(SavedApplicant $savedapplicant)
    {
        $data = $this->savedApplicantService->unsaveApplicant($savedapplicant);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 201);
    }

    public function destroyMultiple(DeleteMultipleSavedApplicantsRequest $request)
    {
        $data = $this->savedApplicantService->unsaveMultipleApplicants($request->getIds());
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 201);
    }
}
