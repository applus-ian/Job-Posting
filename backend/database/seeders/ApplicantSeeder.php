<?php

namespace Database\Seeders;

use App\Models\Applicant;
use Illuminate\Database\Seeder;

class ApplicantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bios = [
            "Passionate developer with experience in web and mobile applications.",
            "Creative UI/UX designer with a love for clean and simple design.",
            "Data analyst with a strong background in statistics and Python.",
            "DevOps engineer skilled in CI/CD pipelines and cloud infrastructure.",
            "Full-stack developer with a focus on Laravel and Vue.js.",
        ];

        for ($i = 1; $i <= 20; $i++) {
            Applicant::create([
                'user_id' => $i, // Make sure users with these IDs exist!
                'biography' => $bios[$i - 1],
                'contact_number' => "09" . rand(100000000, 999999999),
                'dob' => now()->subYears(rand(20, 35))->format('Y-m-d'),
                'gender' => ['male', 'female'][rand(0, 1)],
                'civil_status' => ['single', 'married'][rand(0, 1)],
                'is_willing_to_relocate' => rand(0, 1),
            ]);
        }
    }
}
