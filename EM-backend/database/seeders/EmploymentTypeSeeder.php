<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmploymentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define various employment types
        $employmentTypes = [
            [
                'name' => 'Full-time',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Part-time',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Contract',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Temporary',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Internship',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Probationary',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Freelance',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Remote',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Seasonal',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        // Insert employment types into the table
        DB::table('employment_types')->insert($employmentTypes);
    }
}
