<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\ApplicationRequest;
use App\Http\Requests\Application\ApplicationStatusRequest;
use App\Models\Application;
use App\Models\JobPosting;
use App\Services\Application\ApplicationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    public function __construct(protected ApplicationService $applicationService)
    {
    }

    public function index()
    {
        $applicant = Auth::user()->applicant;
        $data = $this->applicationService->getApplicantApplications($applicant);
        return response()->json($data, 200);
    }

    public function view(Application $application)
    {
        $data = $this->applicationService->viewApplication($application);
        return response()->json($data, 200);
    }

    public function viewAll()
    {
        $data = $this->applicationService->viewAllApplication();
        return response()->json($data, 200);
    }

    public function apply(ApplicationRequest $request, JobPosting $jobposting)
    {
        $data = $this->applicationService->applyJob($request->validated(), $jobposting, $request->user());
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 201);
    }

    public function updateStatus(ApplicationStatusRequest $request, Application $application)
    {
        $data = $this->applicationService->updateApplicationStatus($request->validated(), $application);
        return response()->json($data, 200);
    }
}
