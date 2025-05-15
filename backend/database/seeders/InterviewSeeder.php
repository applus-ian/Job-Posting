<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Interview;
use App\Models\InterviewPanel;

use Illuminate\Database\Seeder;

class InterviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all applications
        $applications = Application::all();

        // Skip seeding if no applications exist
        if ($applications->isEmpty()) {
            echo "No applications found! Skipping interview seeding.\n";
            return;
        }

        echo "Seeding interviews...\n";

        // Create interviews for 70% of applications
        $applicationsForInterview = $applications->random(
            max(1, intval($applications->count() * 0.7))
        );

        // Create interviews
        foreach ($applicationsForInterview as $application) {
            // Create an interview for this application
            $interview = Interview::factory()->create([
                'application_id' => $application->id,
            ]);

                        // Create an interview panel entry
            InterviewPanel::create([
                'interview_id' => $interview->id,
            ]);
        }

        echo "Created " . $applicationsForInterview->count() . " interviews.\n";
    }
}
