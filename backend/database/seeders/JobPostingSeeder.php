<?php


namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JobPosting;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobPostingSeeder extends Seeder
{
    public function run(): void
    {
        JobPosting::factory()->count(10)->create(); 
    }
}
