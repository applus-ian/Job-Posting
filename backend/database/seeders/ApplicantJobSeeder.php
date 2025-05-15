<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\JobPosting;
use App\Models\Applicant;
use Carbon\Carbon;

class ApplicantJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all job postings IDs
        $jobPostings = JobPosting::pluck('id')->toArray();

        // If no job postings exist, create some sample ones
        if (empty($jobPostings)) {
            // Create 10 sample job postings
            for ($i = 1; $i <= 10; $i++) {
                $jobPosting = JobPosting::create([
                    'title' => 'Sample Job ' . $i,
                    'category' => 'IT',
                    'description' => 'This is a sample job posting for testing purposes.',
                    'vacancies' => rand(1, 5),
                    'salary_type' => 'fixed',
                    'salary_min' => 30000,
                    'salary_max' => 70000,
                    'employment_type' => 'Full-time',
                    'employment_level' => 'Entry-level',
                    'work_setup' => 'Remote',
                    'status' => 'active',
                ]);
                $jobPostings[] = $jobPosting->id;
            }
        }

        // Get all applicants from the database
        $applicants = Applicant::all();

        // Loop through all applicants
        foreach ($applicants as $applicant) {
            $applicantId = $applicant->id;

            // Randomly select 3 job postings for each applicant
            $selectedJobPostings = array_rand(array_flip($jobPostings), min(3, count($jobPostings)));

            // Create applications for each selected job posting
            foreach ($selectedJobPostings as $jobId) {
                // Check if application already exists
                $existingApplication = Application::where('applicant_id', $applicantId)
                    ->where('job_posting_id', $jobId)
                    ->first();

                if (!$existingApplication) {
                    // Create a new application
                    Application::create([
                        'status' => 'received', // Using valid enum value from migration
                        // 'status' => ['received', 'reviewed', 'interview', 'offer'],
                        'expected_salary' => rand(30000, 70000), // Random expected salary
                        'applicant_id' => $applicantId,
                        'job_posting_id' => $jobId,
                    ]);
                }
            }
        }
    }
}
