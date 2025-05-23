<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call the HR and department related seeders first
        $this->call([
            DepartmentSeeder::class,
            JobPositionSeeder::class,
            EmploymentTypeSeeder::class,
        ]);

        // Call the employee seeder (which also creates users)
        $this->call([
            EmployeeSeeder::class,
        ]);
    }
}
