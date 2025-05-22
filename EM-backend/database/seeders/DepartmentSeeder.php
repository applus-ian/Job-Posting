<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define departments with hierarchical structure
        // (parent_department_id is null for top-level departments)
        $departments = [
            [
                'name' => 'Executive Management',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Human Resources',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Finance & Accounting',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Information Technology',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Marketing & Sales',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Operations',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Research & Development',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Customer Service',
                'parent_department_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Sub-departments for HR
            [
                'name' => 'Recruitment',
                'parent_department_id' => 2, // Will reference Human Resources
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Training & Development',
                'parent_department_id' => 2, // Will reference Human Resources
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Employee Relations',
                'parent_department_id' => 2, // Will reference Human Resources
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Compensation & Benefits',
                'parent_department_id' => 2, // Will reference Human Resources
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        // Insert departments into the table
        DB::table('department_assigns')->insert($departments);
    }
}
