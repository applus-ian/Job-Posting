<?php

namespace App\Http\Controllers\JobPosting;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobPosting\JobPostingRequest;
use App\Models\JobPosting;
use App\Services\JobPosting\JobPostingService;
use Illuminate\Http\Request;

class JobPostingController extends Controller
{
    public function __construct(protected JobPostingService $jobPostingService)
    {
    }

    public function store(JobPostingRequest $request)
    {
        $data = $this->jobPostingService->createJobPosting($request->validated());
        return response()->json($data, 201);
    }

    public function update(JobPostingRequest $request, JobPosting $jobposting)
    {
        $data = $this->jobPostingService->updateJobPosting($request->validated(), $jobposting);
        return response()->json($data, 200);
    }

    public function destroy(JobPosting $jobposting)
    {
        $data = $this->jobPostingService->deleteJobPosting($jobposting);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
