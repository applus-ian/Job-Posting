<?php

namespace App\Http\Controllers\JobPosting;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use App\Models\SavedJob;
use App\Services\JobPosting\SavedJobService;
use Illuminate\Http\Request;

class SavedJobController extends Controller
{
    public function __construct(protected SavedJobService $savedJobService)
    {
    }

    public function index()
    {
        $data = $this->savedJobService->getSavedJobPosting();
        return response()->json($data, 201);
    }

    public function store(JobPosting $jobposting)
    {
        $data = $this->savedJobService->saveJobPosting($jobposting);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }

        return response()->json($data, 201);
    }

    public function destroy(SavedJob $savedjob)
    {
        $data = $this->savedJobService->unsaveJobPosting($savedjob);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }

        return response()->json($data, 201);
    }
}
