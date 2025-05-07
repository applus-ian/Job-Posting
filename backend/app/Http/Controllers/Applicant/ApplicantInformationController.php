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
        $data = $this->applicantInformationService->getApplicantInformation($user->id);
        return response()->json($data);
    }

    public function update(ApplicantInformationRequest $request, Applicant $applicant)
    {
        $data = $this->applicantInformationService->updateInformation($request->validated(), $applicant);
        return response()->json($data, 200);
    }
}
