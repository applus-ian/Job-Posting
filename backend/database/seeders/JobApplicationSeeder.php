<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\JobPosting;

class JobApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $applicantId = 2;

        $jobPostings = JobPosting::inRandomOrder()->take(5)->pluck('id');

        foreach ($jobPostings as $jobId) {
            Application::create([
                'status' => 'submitted',
                'expected_salary' => rand(30000, 70000),
                'applicant_id' => $applicantId,
                'job_posting_id' => $jobId,
            ]);
        }
    }
}