<?php

namespace Database\Factories;

use App\Models\Interview;
use App\Models\Application;
use Illuminate\Database\Eloquent\Factories\Factory;

class InterviewFactory extends Factory
{
    protected $model = Interview::class;

    public function definition(): array
    {
        $mode = $this->faker->randomElement(['in_person', 'virtual']);

        return [
            'schedule_date' => $this->faker->date(),
            'schedule_time' => $this->faker->time(),
            'mode' => $mode,
            'meeting_link' => $mode === 'virtual' ? $this->faker->url() : null,
            'platform' => $mode === 'virtual' ? $this->faker->randomElement(['Zoom', 'Google Meet', 'MS Teams']) : null,
            'location' => $mode === 'in_person' ? $this->faker->address() : null,
            'status' => $this->faker->randomElement(['upcoming', 'completed', 'rescheduled', 'no-show', 'cancelled']),
            'application_id' => Application::factory(), // Assumes Application factory exists
        ];
    }
}
