<?php

namespace Database\Seeders;

use App\Models\JobPosting;
use App\Models\JobTag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                        "version" => 1,
                        "textFormat" => 0,
                        "textStyle" => ""
                    ],
                    [
                        "children" => [
                            ["detail" => 0, "format" => 1, "mode" => "normal", "style" => "", "text" => "Key Responsibilities:", "type" => "text", "version" => 1]
                        ],
                        "direction" => "ltr",
                        "format" => "",
                        "indent" => 0,
                        "type" => "paragraph",
                        "version" => 1,
                        "textFormat" => 0,
                        "textStyle" => ""
                    ],
                    [
                        "children" => [
                            [
                                "children" => [
                                    ["detail" => 0, "format" => 0, "mode" => "normal", "style" => "", "text" => "Convert Figma/Adobe XD designs into functional, responsive code", "type" => "text", "version" => 1]
                                ],
                                "direction" => "ltr",
                                "format" => "",
                                "indent" => 0,
                                "type" => "listitem",
                                "version" => 1,
                                "value" => 1
                            ],
                            [
                                "children" => [
                                    ["detail" => 0, "format" => 0, "mode" => "normal", "style" => "", "text" => "Collaborate with backend developers and designers to improve usability", "type" => "text", "version" => 1]
                                ],
                                "direction" => "ltr",
                                "format" => "",
                                "indent" => 0,
                                "type" => "listitem",
                                "version" => 1,
                                "value" => 2
                            ],
                            [
                                "children" => [
                                    ["detail" => 0, "format" => 0, "mode" => "normal", "style" => "", "text" => "Optimize web applications for maximum speed and scalability", "type" => "text", "version" => 1]
                                ],
                                "direction" => "ltr",
                                "format" => "",
                                "indent" => 0,
                                "type" => "listitem",
                                "version" => 1,
                                "value" => 3
                            ],
                            [
                                "children" => [
                                    ["detail" => 0, "format" => 0, "mode" => "normal", "style" => "", "text" => "Ensure brand consistency across all platforms", "type" => "text", "version" => 1]
                                ],
                                "direction" => "ltr",
                                "format" => "",
                                "indent" => 0,
                                "type" => "listitem",
                                "version" => 1,
                                "value" => 4
                            ]
                        ],
                        "direction" => "ltr",
                        "format" => "",
                        "indent" => 0,
                        "type" => "list",
                        "version" => 1,
                        "listType" => "bullet",
                        "start" => 1,
                        "tag" => "ul"
                    ]
                ],
                "direction" => "ltr",
                "format" => "",
                "indent" => 0,
                "type" => "root",
                "version" => 1
            ]
        ];

        $jobPosting = JobPosting::create([
            'title' => 'Front-End Web Developer',
            'category' => 'Web Development',
            'description' => json_encode($jobDescription),
            'vacancies' => 3,
            'salary_type' => 'monthly',
            'salary_min' => 40000.00,
            'salary_max' => 60000.00,
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
