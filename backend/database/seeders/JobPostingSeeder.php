<?php

namespace Database\Seeders;

use App\Models\JobPosting;
use App\Models\JobTag;
use Illuminate\Database\Seeder;

class JobPostingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobDescription = [
            "root" => [
                "children" => [
                    [
                        "children" => [
                            ["detail" => 0, "format" => 0, "mode" => "normal", "style" => "", "text" => "We are looking for a talented ", "type" => "text", "version" => 1],
                            ["detail" => 0, "format" => 1, "mode" => "normal", "style" => "", "text" => "Front-End Web Developer", "type" => "text", "version" => 1],
                            ["detail" => 0, "format" => 0, "mode" => "normal", "style" => "", "text" => " to join our creative team...", "type" => "text", "version" => 1]
                        ],
                        "direction" => "ltr",
                        "type" => "paragraph",
                        "version" => 1
                    ]
                ],
                "type" => "root",
                "version" => 1
            ]
        ];

        for ($i = 1; $i <= 5; $i++) {
            $jobPosting = JobPosting::create([
                'title' => "Front-End Developer #$i",
                'category' => 'Web Development',
                'description' => json_encode($jobDescription),
                'vacancies' => rand(1, 5),
                'salary_type' => 'monthly',
                'salary_min' => 40000 + ($i * 1000),
                'salary_max' => 60000 + ($i * 1000),
                'employment_type' => 'Full-time',
                'employment_level' => 'Mid-Senior',
                'work_setup' => 'Remote',
                'status' => 'open',
                'address_id' => null,
            ]);

            JobTag::create([
                'tag' => 'Responsive Design',
                'job_posting_id' => $jobPosting->id,
            ]);
        }
    }
}
