<?php

namespace App\Console\Commands;

use App\Enums\Gender;
use App\Enums\CivilStatus;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateHREmployee extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'employee:create-hr {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new HR employee with the given email and password';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        // Check if employee with this email already exists
        if (Employee::where('email', $email)->exists()) {
            $this->error("Employee with email {$email} already exists!");
            return 1;
        }

        // Create the employee
        $employee = Employee::create([
            'first_name' => 'Yestin',
            'middle_name' => 'Rey',
            'last_name' => 'Prado',
            'suffix' => null,
            'gender' => Gender::Male->value,
            'birthdate' => '1990-01-01',
            'civil_status' => CivilStatus::Single->value,
            'nationality' => 'Filipino',
            'region' => 'NCR',
            'province' => 'Metro Manila',
            'city_or_municipality' => 'Makati',
            'barangay' => 'San Lorenzo',
            'street' => '123 Sample Street',
            'phone_number' => '09991234567',
            'emergency_contact1' => '09992345678',
            'emergency_contact2' => '09993456789',
            'email' => $email,
            'job_position_id' => 7, // HR Specialist
            'date_hired' => now()->format('Y-m-d'),
            'employment_type_id' => 1, // Full-time
            'manager_id' => 2, // Reports to HR Manager
            'department_id' => 2, // Human Resources Department
        ]);

        // Create the user account
        $user = User::create([
            'employee_id' => $employee->id,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $this->info("HR Employee created successfully!");
        $this->info("Name: {$employee->first_name} {$employee->last_name}");
        $this->info("Email: {$email}");
        $this->info("Position: HR Specialist");
        $this->info("Department: Human Resources");

        return 0;
    }
}
