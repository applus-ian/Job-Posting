<?php
namespace Database\Factories;

use App\Models\Applicant;
use App\Models\JobPosting;
use Illuminate\Database\Eloquent\Factories\Factory;

class ApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'status' => $this->faker->randomElement(['received', 'reviewed', 'interview', 'offer', 'hired']),
            'expected_salary' => $this->faker->numberBetween(20000, 60000),
            'applicant_id' => Applicant::inRandomOrder()->first()?->id ?? Applicant::factory(),
            'job_posting_id' => JobPosting::inRandomOrder()->first()?->id ?? JobPosting::factory(),
        ];
    }
}
