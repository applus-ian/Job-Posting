<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\ApplicationRequest;
use App\Models\JobPosting;
use App\Services\Application\ApplicationService;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function __construct(protected ApplicationService $applicationService)
    {
    }

    public function apply(ApplicationRequest $request, JobPosting $jobposting)
    {
        $data = $this->applicationService->applyJob($request->validated(), $jobposting, $request->user());
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 201);
    }
}
