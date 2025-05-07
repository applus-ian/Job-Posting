<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\WorkExperienceRequest;
use App\Models\WorkExperience;
use App\Services\Applicant\WorkExperienceService;
use Illuminate\Http\Request;

class WorkExperienceController extends Controller
{
    public function __construct(protected WorkExperienceService $workExperienceService)
    {
    }

    public function store(WorkExperienceRequest $request)
    {
        $data = $this->workExperienceService->createWorkExperience($request->validated(), $request->user());
        return response()->json($data, 201);
    }

    public function update(WorkExperienceRequest $request, WorkExperience $workexperience)
    {
        $data = $this->workExperienceService->updateWorkExperience($request->validated(), $workexperience);
        return response()->json($data, 200);
    }

    public function destroy(WorkExperience $workexperience)
    {
        $data = $this->workExperienceService->deleteWorkExperience($workexperience);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
