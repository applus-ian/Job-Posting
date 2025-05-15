<?php

namespace Database\Factories;

use App\Models\Application;
use App\Models\Interview;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Interview>
 */
class InterviewFactory extends Factory
{
    protected $model = Interview::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Choose random mode for the interview
        $mode = $this->faker->randomElement(['in_person', 'virtual']);

        // Initialize variables with null values
        $meetingLink = null;
        $platform = null;
        $location = null;

        // If the mode is virtual, generate meeting link and platform
        if ($mode === 'virtual') {
            $meetingLink = $this->faker->url;
            $platform = $this->faker->randomElement(['Zoom', 'Google Meet', 'Microsoft Teams', 'Skype']);
        } else {
            // If the mode is in-person, generate a location
            $location = $this->faker->address;
        }

        // Get a random application ID or create a new application if none exists
        $applicationId = Application::inRandomOrder()->first()?->id ??
                         Application::factory()->create()->id;

        return [
            'schedule_date' => $this->faker->dateTimeBetween('+1 week', '+4 weeks')->format('Y-m-d'),
            'schedule_time' => $this->faker->time('H:i:00'),
            'mode' => $mode,
            'meeting_link' => $meetingLink,
            'platform' => $platform,
            'location' => $location,
            'application_id' => $applicationId,
        ];
    }
}
