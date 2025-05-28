<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use app\models\JobPosting;

class Stat_card extends Controller
{
    public function count_jobposting(): JsonResponse
    {
        $count = JobPosting::count();
        return response()->json([
            'total_job_posting' => $count
        ]);
    }
}
