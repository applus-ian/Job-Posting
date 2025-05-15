<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\JobPosting;

class JobPostingFactory extends Factory
{
    protected $model = JobPosting::class;

    public function definition(): array
    {
               return [
            'title' => $this->faker->jobTitle,
            'category' => $this->faker->randomElement(['IT', 'Marketing', 'Finance', 'HR', 'Engineering']),
            'description' => json_encode([
                'summary' => $this->faker->paragraph,
                'responsibilities' => $this->faker->sentences(3),
                'qualifications' => $this->faker->sentences(2)
            ]),
            'vacancies' => $this->faker->numberBetween(1, 10),
            'salary_type' => $this->faker->randomElement(['monthly', 'hourly', 'weekly', 'annually']),
            'salary_min' => $this->faker->numberBetween(20000, 50000),
            'salary_max' => $this->faker->numberBetween(60000, 120000),
            'employment_type' => $this->faker->randomElement(['Full-time', 'Part-time', 'Contract']),
            'employment_level' => $this->faker->randomElement(['Junior', 'Mid-level', 'Senior']),
            'work_setup' => $this->faker->randomElement(['On-site', 'Remote', 'Hybrid']),
            'status' => $this->faker->randomElement(['open', 'closed', 'draft']),
            'address_id' => 1, // or null if you don't have addresses
        ];
    }
}
