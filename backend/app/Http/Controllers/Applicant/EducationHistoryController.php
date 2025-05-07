<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\EducationHistoryRequest;
use App\Models\EducationHistory;
use App\Services\Applicant\EducationHistoryService;
use Illuminate\Http\Request;

class EducationHistoryController extends Controller
{
    public function __construct(protected EducationHistoryService $educationHistoryService)
    {
    }

    public function store(EducationHistoryRequest $request)
    {
        $data = $this->educationHistoryService->createEducationHistory($request->validated(), $request->user());
        return response()->json($data, 201);
    }

    public function update(EducationHistoryRequest $request, EducationHistory $educationhistory)
    {
        $data = $this->educationHistoryService->updateEducationHistory($request->validated(), $educationhistory);
        return response()->json($data, 200);
    }

    public function destroy(EducationHistory $educationhistory)
    {
        $data = $this->educationHistoryService->deleteEducationHistory($educationhistory);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
