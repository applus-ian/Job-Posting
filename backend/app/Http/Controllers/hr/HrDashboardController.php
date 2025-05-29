<?php

namespace App\Http\Controllers\hr;

use App\Http\Controllers\Controller;
use App\Models\Interview;
use Illuminate\Http\JsonResponse;
use App\Models\JobPosting;
use App\Models\Application;
// use App\Models\Interview;
use Illuminate\Support\Facades\DB;

class HrDashboardController extends Controller
{
    public function HrDashBoard(): JsonResponse
    {
        $count_jobposting = JobPosting::count();
        $count_reviewed_application = Application::where('status', 'reviewed')->count();
        $count_interview_application = Application::where('status', 'interview')->count();
        $jobposting_list = JobPosting::all();
        $application_on_year = Application::where('updated_at')->count();
        //applicaiton per year count
        $monthlyData = Application::select(
            DB::raw("MONTH(updated_at)  as month"),
            DB::raw("COUNT(*) as total")
        )
        ->whereYear('updated_at', now()->year)
        ->groupBy(DB::raw("MONTH(updated_at)"))
        ->groupBy(DB::raw("MONTH(updated_at)"))
        ->get();

        $monthlyApplication = array_fill(1,12,0);
        
        foreach ($monthlyData as $data) {
            $monthlyApplication[$data->month] = $data->total;    
        }

        $interview_schedule_calendar = Interview::select(
        'interviews.schedule_date',
        'interviews.schedule_time',
        'interviews.mode',
        'applicants.first_name',
        'applicants.middle_name',
        'applicants.last_name'
    )
    ->join('applications', 'interviews.application_id', '=', 'applications.id')
    ->join('applicants', 'applications.applicant_id', '=', 'applicants.id')
    ->orderBy('interviews.schedule_date')
    ->orderBy('interviews.schedule_time')
    ->get()
    ->map(function ($item) {
        return [
            'schedule_date' => $item->schedule_date,
            'schedule_time' => date('H:i', strtotime($item->schedule_time)),
            'mode' => $item->mode,
            'applicant_name' => implode(' ', array_filter([
                $item->first_name,
                $item->middle_name,
                $item->last_name
            ])),
        ];
    });

        return response()->json([
            'total_job_posting' => $count_jobposting,
            'total_reviewed_application' => $count_reviewed_application,
            'total_interview_application' => $count_interview_application,
            'jobposting_list' => $jobposting_list,
            'total_application_per_month' => array_values($monthlyApplication),
            'interview_schedules' => $interview_schedule_calendar
        ]);
    }
}
