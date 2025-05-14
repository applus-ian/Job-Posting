<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user manually since we don't have a name column
        $user = User::create([
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        echo "Created user with ID: " . $user->id . "\n";

        // Create a test address for job postings
        $address = Address::create([
            'address' => '123 Main St',
            'country' => 'United States',
            'province' => 'California',
            'city' => 'San Francisco',
            'street' => 'Main Street',
            'zipcode' => '94105',
        ]);

        echo "Created address with ID: " . $address->id . "\n";
    }
}
