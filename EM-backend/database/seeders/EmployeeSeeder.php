<?php

namespace Database\Seeders;

use App\Enums\Gender;
use App\Enums\CivilStatus;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create HR employees
        $this->createHREmployees();

        // Create IT employees
        $this->createITEmployees();

        // Create other department employees
        $this->createOtherDepartmentEmployees();
    }

    /**
     * Create HR employees with appropriate job positions
     */
    private function createHREmployees()
    {
        $hrEmployees = [
            // HR Director
            [
                'first_name' => 'Maria',
                'middle_name' => 'Santos',
                'last_name' => 'Cruz',
                'suffix' => null,
                'gender' => Gender::Female->value,
                'birthdate' => '1980-05-10',
                'civil_status' => CivilStatus::Married->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Makati',
                'barangay' => 'San Lorenzo',
                'street' => '123 Ayala Avenue',
                'phone_number' => '09171234567',
                'emergency_contact1' => '09189876543',
                'emergency_contact2' => '09165554433',
                'email' => 'maria.cruz@example.com',
                'job_position_id' => 5, // HR Director
                'date_hired' => '2015-01-15',
                'employment_type_id' => 1, // Full-time
                'manager_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],

            // HR Manager
            [
                'first_name' => 'Juan',
                'middle_name' => 'Rizal',
                'last_name' => 'Reyes',
                'suffix' => 'Jr.',
                'gender' => Gender::Male->value,
                'birthdate' => '1985-07-22',
                'civil_status' => CivilStatus::Married->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Mandaluyong',
                'barangay' => 'Wack Wack',
                'street' => '456 Shaw Boulevard',
                'phone_number' => '09182223333',
                'emergency_contact1' => '09173334444',
                'emergency_contact2' => '09194445555',
                'email' => 'juan.reyes@example.com',
                'job_position_id' => 6, // HR Manager
                'date_hired' => '2016-03-10',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 1, // Reports to HR Director (Maria Cruz)
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Recruitment Manager
            [
                'first_name' => 'Ana',
                'middle_name' => 'Magsaysay',
                'last_name' => 'Lim',
                'suffix' => null,
                'gender' => Gender::Female->value,
                'birthdate' => '1988-09-15',
                'civil_status' => CivilStatus::Single->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Quezon City',
                'barangay' => 'Cubao',
                'street' => '789 EDSA Avenue',
                'phone_number' => '09183336666',
                'emergency_contact1' => '09187778888',
                'emergency_contact2' => '09199990000',
                'email' => 'ana.lim@example.com',
                'job_position_id' => 8, // Recruitment Manager
                'date_hired' => '2017-05-22',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 2, // Reports to HR Manager (Juan Reyes)
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Recruiter
            [
                'first_name' => 'Paolo',
                'middle_name' => 'Mabini',
                'last_name' => 'Santos',
                'suffix' => null,
                'gender' => Gender::Male->value,
                'birthdate' => '1990-11-30',
                'civil_status' => CivilStatus::Single->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Pasig',
                'barangay' => 'Kapitolyo',
                'street' => '101 Pioneer Street',
                'phone_number' => '09171112222',
                'emergency_contact1' => '09185556666',
                'emergency_contact2' => '09197778888',
                'email' => 'paolo.santos@example.com',
                'job_position_id' => 9, // Recruiter
                'date_hired' => '2019-08-15',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 3, // Reports to Recruitment Manager (Ana Lim)
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Training and Development Manager
            [
                'first_name' => 'Sophia',
                'middle_name' => 'Bonifacio',
                'last_name' => 'Garcia',
                'suffix' => null,
                'gender' => Gender::Female->value,
                'birthdate' => '1987-02-18',
                'civil_status' => CivilStatus::Married->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Taguig',
                'barangay' => 'BGC',
                'street' => '28th Street',
                'phone_number' => '09189991111',
                'emergency_contact1' => '09172223333',
                'emergency_contact2' => '09198887777',
                'email' => 'sophia.garcia@example.com',
                'job_position_id' => 10, // Training and Development Manager
                'date_hired' => '2017-01-10',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 2, // Reports to HR Manager (Juan Reyes)
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Learning Specialist
            [
                'first_name' => 'Marco',
                'middle_name' => 'Luna',
                'last_name' => 'Bautista',
                'suffix' => null,
                'gender' => Gender::Male->value,
                'birthdate' => '1992-06-25',
                'civil_status' => CivilStatus::Single->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Pasay',
                'barangay' => 'Malibay',
                'street' => '123 EDSA Extension',
                'phone_number' => '09173337777',
                'emergency_contact1' => '09186664444',
                'emergency_contact2' => '09192221111',
                'email' => 'marco.bautista@example.com',
                'job_position_id' => 11, // Learning Specialist
                'date_hired' => '2020-02-15',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 5, // Reports to Training Manager (Sophia Garcia)
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Compensation and Benefits Manager
            [
                'first_name' => 'Isabella',
                'middle_name' => 'Quezon',
                'last_name' => 'Mendoza',
                'suffix' => null,
                'gender' => Gender::Female->value,
                'birthdate' => '1986-04-12',
                'civil_status' => CivilStatus::Married->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'San Juan',
                'barangay' => 'Greenhills',
                'street' => '456 Ortigas Avenue',
                'phone_number' => '09185553333',
                'emergency_contact1' => '09171119999',
                'emergency_contact2' => '09196662222',
                'email' => 'isabella.mendoza@example.com',
                'job_position_id' => 12, // Compensation and Benefits Manager
                'date_hired' => '2016-07-01',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 2, // Reports to HR Manager (Juan Reyes)
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Payroll Specialist
            [
                'first_name' => 'Gabriel',
                'middle_name' => 'Laurel',
                'last_name' => 'Tan',
                'suffix' => null,
                'gender' => Gender::Male->value,
                'birthdate' => '1991-10-05',
                'civil_status' => CivilStatus::Single->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Parañaque',
                'barangay' => 'BF Homes',
                'street' => '789 Aguirre Avenue',
                'phone_number' => '09177778888',
                'emergency_contact1' => '09184445555',
                'emergency_contact2' => '09193336666',
                'email' => 'gabriel.tan@example.com',
                'job_position_id' => 13, // Payroll Specialist
                'date_hired' => '2019-03-15',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 7, // Reports to Compensation Manager (Isabella Mendoza)
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        // Insert HR employees
        foreach ($hrEmployees as $employee) {
            $employeeId = DB::table('employees')->insertGetId($employee);

            // Create user accounts for each HR employee
            DB::table('users')->insert([
                'employee_id' => $employeeId,
                'email' => $employee['email'],
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    /**
     * Create IT department employees
     */
    private function createITEmployees()
    {
        $itEmployees = [
            // IT Manager
            [
                'first_name' => 'Miguel',
                'middle_name' => 'Del Pilar',
                'last_name' => 'Aquino',
                'suffix' => null,
                'gender' => Gender::Male->value,
                'birthdate' => '1982-08-17',
                'civil_status' => CivilStatus::Married->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Makati',
                'barangay' => 'Poblacion',
                'street' => '123 Jupiter Street',
                'phone_number' => '09171234568',
                'emergency_contact1' => '09189876544',
                'emergency_contact2' => '09165554434',
                'email' => 'miguel.aquino@example.com',
                'job_position_id' => 14, // IT Manager
                'date_hired' => '2015-03-15',
                'employment_type_id' => 1, // Full-time
                'manager_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],

            // Full Stack Developer
            [
                'first_name' => 'Lucas',
                'middle_name' => 'Agoncillo',
                'last_name' => 'Dizon',
                'suffix' => null,
                'gender' => Gender::Male->value,
                'birthdate' => '1990-04-25',
                'civil_status' => CivilStatus::Single->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Pasig',
                'barangay' => 'San Antonio',
                'street' => '456 C. Raymundo Avenue',
                'phone_number' => '09171234569',
                'emergency_contact1' => '09189876545',
                'emergency_contact2' => '09165554435',
                'email' => 'lucas.dizon@example.com',
                'job_position_id' => 18, // Full Stack Developer
                'date_hired' => '2018-05-10',
                'employment_type_id' => 1, // Full-time
                'manager_id' => 9, // Reports to IT Manager (Miguel Aquino)
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        // Insert IT employees
        foreach ($itEmployees as $employee) {
            $employeeId = DB::table('employees')->insertGetId($employee);

            // Create user accounts for each IT employee
            DB::table('users')->insert([
                'employee_id' => $employeeId,
                'email' => $employee['email'],
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    /**
     * Create other department employees
     */
    private function createOtherDepartmentEmployees()
    {
        $otherEmployees = [
            // Marketing Manager
            [
                'first_name' => 'Sofia',
                'middle_name' => 'Aguinaldo',
                'last_name' => 'Lopez',
                'suffix' => null,
                'gender' => Gender::Female->value,
                'birthdate' => '1984-12-03',
                'civil_status' => CivilStatus::Married->value,
                'nationality' => 'Filipino',
                'region' => 'NCR',
                'province' => 'Metro Manila',
                'city_or_municipality' => 'Taguig',
                'barangay' => 'McKinley Hill',
                'street' => '789 Upper McKinley Road',
                'phone_number' => '09171234570',
                'emergency_contact1' => '09189876546',
                'emergency_contact2' => '09165554436',
                'email' => 'sofia.lopez@example.com',
                'job_position_id' => 22, // Marketing Manager
                'date_hired' => '2016-08-20',
                'employment_type_id' => 1, // Full-time
                'manager_id' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        // Insert other employees
        foreach ($otherEmployees as $employee) {
            $employeeId = DB::table('employees')->insertGetId($employee);

            // Create user accounts for each employee
            DB::table('users')->insert([
                'employee_id' => $employeeId,
                'email' => $employee['email'],
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
