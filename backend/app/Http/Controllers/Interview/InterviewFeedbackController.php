<?php

namespace App\Http\Controllers\Interview;

use App\Http\Controllers\Controller;
use App\Http\Requests\Interview\InterviewFeedbackRequest;
use App\Models\Feedback;
use App\Models\Interview;
use App\Services\Interview\InterviewFeedbackService;
use Illuminate\Http\Request;

class InterviewFeedbackController extends Controller
{
    public function __construct(protected InterviewFeedbackService $interviewFeedbackService)
    {
    }

    public function store(InterviewFeedbackRequest $request, Interview $interview)
    {
        $data = $this->interviewFeedbackService->createFeedback($request->validated(), $interview);
        return response()->json($data, 201);
    }

    public function update(InterviewFeedbackRequest $request, Interview $interview, Feedback $feedback)
    {
        $data = $this->interviewFeedbackService->updateFeedback($request->validated(), $interview, $feedback);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }

    public function destroy(Interview $interview, Feedback $feedback)
    {
        $data = $this->interviewFeedbackService->deleteFeedback($interview, $feedback);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
