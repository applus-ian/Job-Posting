<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define various job positions including HR roles
        $jobPositions = [
            // Executive positions
            [
                'title' => 'Chief Executive Officer (CEO)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Chief Financial Officer (CFO)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Chief Technology Officer (CTO)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Chief Operating Officer (COO)',
                'created_at' => now(),
                'updated_at' => now()
            ],

            // HR positions
            [
                'title' => 'HR Director',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'HR Manager',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'HR Specialist',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Recruitment Manager',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Recruiter',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Training and Development Manager',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Learning Specialist',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Compensation and Benefits Manager',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Payroll Specialist',
                'created_at' => now(),
                'updated_at' => now()
            ],

            // IT positions
            [
                'title' => 'IT Manager',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Software Engineer',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Frontend Developer',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Backend Developer',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Full Stack Developer',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'DevOps Engineer',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'System Administrator',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Database Administrator',
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Marketing positions
            [
                'title' => 'Marketing Manager',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Marketing Specialist',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Sales Representative',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        // Insert job positions into the table
        DB::table('job_positions')->insert($jobPositions);
    }
}
