<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\ApplicantInformationRequest;
use App\Models\Applicant;
use App\Services\Applicant\ApplicantInformationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicantInformationController extends Controller
{
    public function __construct(protected ApplicantInformationService $applicantInformationService)
    {
    }

    public function index()
    {
        $user = Auth::user();
        $data = $this->applicantInformationService->getApplicantInformation($user->id, true);
        return response()->json($data, 200);
    }

    public function update(ApplicantInformationRequest $request, Applicant $applicant)
    {
        $data = $this->applicantInformationService->updateInformation($request->validated(), $applicant);
        return response()->json($data, 200);
    }

    public function viewApplicant(Applicant $applicant)
    {
        $data = $this->applicantInformationService->getApplicantInformation($applicant->user_id, false, true);
        return response()->json($data, 200);
    }
}
