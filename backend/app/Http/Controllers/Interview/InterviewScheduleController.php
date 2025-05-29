<?php

namespace App\Http\Controllers\Interview;

use App\Http\Controllers\Controller;
use App\Http\Requests\Interview\InterviewScheduleRequest;
use App\Models\Application;
use App\Models\Interview;
use App\Services\Interview\InterviewScheduleService;
use Illuminate\Http\Request;

class InterviewScheduleController extends Controller
{
    public function __construct(protected InterviewScheduleService $interviewScheduleService)
    {
    }

    public function scheduleInterview(InterviewScheduleRequest $request, Application $application)
    {
        $data = $this->interviewScheduleService->createInterviewSchedule($request->validated(), $application);
        return response()->json($data, 201);
    }

    public function updateInterview(InterviewScheduleRequest $request, Interview $interview)
    {
        $data = $this->interviewScheduleService->updateInterviewSchedule($request->validated(), $interview);
        return response()->json($data, 200);
    }

    public function viewInterview()
    {
        $data = $this->interviewScheduleService->getInterviewSchedule();
        return response()->json($data, 200);
    }
}
