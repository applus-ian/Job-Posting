<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\ApplicationRequest;
use App\Http\Requests\Application\ApplicationStatusRequest;
use App\Models\Application;
use App\Models\JobPosting;
use App\Services\Application\ApplicationService;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function __construct(protected ApplicationService $applicationService)
    {
    }

    public function view(Application $application)
    {
        $applicationData = $this->applicationService->viewApplication($application);
        return response()->json(['application' => $applicationData]);
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
