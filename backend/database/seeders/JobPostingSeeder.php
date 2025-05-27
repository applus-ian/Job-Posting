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
                            ["detail" => 0, "format" => 0, "mode" => "normal", "style" => "", "text" => " to join our creative team. You'll be responsible for translating UI/UX designs into responsive web interfaces using HTML, CSS, and JavaScript frameworks.", "type" => "text", "version" => 1]
                        ],
                        "direction" => "ltr",
                        "format" => "",
                        "indent" => 0,
                        "type" => "paragraph",
                        "version" => 1
                    ]
                ],
                "direction" => "ltr",
                "format" => "",
                "indent" => 0,
                "type" => "root",
                "version" => 1
            ]
        ];

        $jobs = [
            [
                'title' => 'Front-End Web Developer',
                'category' => 'Web Development',
                'vacancies' => 3,
                'salary_min' => 40000,
                'salary_max' => 60000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Mid-Senior',
                'work_setup' => 'Remote',
            ],
            [
                'title' => 'Back-End Developer',
                'category' => 'Web Development',
                'vacancies' => 2,
                'salary_min' => 45000,
                'salary_max' => 65000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Mid-Senior',
                'work_setup' => 'Onsite',
            ],
            [
                'title' => 'UI/UX Designer',
                'category' => 'Design',
                'vacancies' => 1,
                'salary_min' => 35000,
                'salary_max' => 50000,
                'employment_type' => 'Contract',
                'employment_level' => 'Mid',
                'work_setup' => 'Remote',
            ],
            [
                'title' => 'Mobile App Developer',
                'category' => 'Mobile Development',
                'vacancies' => 2,
                'salary_min' => 50000,
                'salary_max' => 70000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Senior',
                'work_setup' => 'Hybrid',
            ],
            [
                'title' => 'Data Analyst',
                'category' => 'Data Science',
                'vacancies' => 1,
                'salary_min' => 45000,
                'salary_max' => 60000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Junior',
                'work_setup' => 'Remote',
            ],
            [
                'title' => 'DevOps Engineer',
                'category' => 'Infrastructure',
                'vacancies' => 1,
                'salary_min' => 55000,
                'salary_max' => 75000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Senior',
                'work_setup' => 'Onsite',
            ],
            [
                'title' => 'QA Tester',
                'category' => 'Quality Assurance',
                'vacancies' => 2,
                'salary_min' => 30000,
                'salary_max' => 45000,
                'employment_type' => 'Contract',
                'employment_level' => 'Junior',
                'work_setup' => 'Remote',
            ],
            [
                'title' => 'Project Manager',
                'category' => 'Management',
                'vacancies' => 1,
                'salary_min' => 60000,
                'salary_max' => 80000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Senior',
                'work_setup' => 'Hybrid',
            ],
            [
                'title' => 'Marketing Specialist',
                'category' => 'Marketing',
                'vacancies' => 1,
                'salary_min' => 35000,
                'salary_max' => 50000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Mid',
                'work_setup' => 'Remote',
            ],
            [
                'title' => 'Technical Support Engineer',
                'category' => 'Support',
                'vacancies' => 3,
                'salary_min' => 30000,
                'salary_max' => 45000,
                'employment_type' => 'Full-time',
                'employment_level' => 'Junior',
                'work_setup' => 'Onsite',
            ],
        ];

        foreach ($jobs as $job) {
            $posting = JobPosting::create([
                'title' => $job['title'],
                'category' => $job['category'],
                'description' => json_encode($jobDescription),
                'vacancies' => $job['vacancies'],
                'salary_type' => 'monthly',
                'salary_min' => $job['salary_min'],
                'salary_max' => $job['salary_max'],
                'employment_type' => $job['employment_type'],
                'employment_level' => $job['employment_level'],
                'work_setup' => $job['work_setup'],
                'status' => 'open',
                'address_id' => null,
            ]);

            JobTag::create([
                'tag' => 'General',
                'job_posting_id' => $posting->id,
            ]);
        }
    }
}
