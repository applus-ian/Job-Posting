<?php

namespace Database\Factories;

use App\Models\Interview;
use App\Models\InterviewPanel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InterviewPanel>
 */
class InterviewPanelFactory extends Factory
{
    protected $model = InterviewPanel::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random interview ID or create a new interview if none exists
        $interviewId = Interview::inRandomOrder()->first()?->id ??
                      Interview::factory()->create()->id;

        return [
            'interview_id' => $interviewId,
        ];
    }
}
