<?php

namespace App\Models;

use App\Enums\Gender;
use App\Enums\CivilStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'gender',
        'birthdate',
        'civil_status',
        'nationality',
        'region',
        'province',
        'city_or_municipality',
        'barangay',
        'street',
        'phone_number',
        'emergency_contact1',
        'emergency_contact2',
        'email',
        'job_position_id',
        'date_hired',
        'employment_type_id',
        'manager_id',
        'department_id',
        'profile_pic_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birthdate' => 'date',
        'date_hired' => 'date',
        'gender' => Gender::class,
        'civil_status' => CivilStatus::class,
    ];

    /**
     * Get the user associated with the employee.
     */
    public function user()
    {
        return $this->hasOne(User::class);
    }

    /**
     * Get the job position of the employee.
     */
    public function jobPosition()
    {
        return $this->belongsTo(JobPosition::class);
    }

    /**
     * Get the employment type of the employee.
     */
    public function employmentType()
    {
        return $this->belongsTo(EmploymentType::class);
    }

    /**
     * Get the department of the employee.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the manager of the employee.
     */
    public function manager()
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }

    /**
     * Get all subordinates (employees managed by this employee).
     */
    public function subordinates()
    {
        return $this->hasMany(Employee::class, 'manager_id');
    }

    /**
     * Get the employee's full name.
     */
    public function getFullNameAttribute()
    {
        $fullName = $this->first_name;

        if ($this->middle_name) {
            $fullName .= ' ' . substr($this->middle_name, 0, 1) . '.';
        }

        $fullName .= ' ' . $this->last_name;

        if ($this->suffix) {
            $fullName .= ' ' . $this->suffix;
        }

        return $fullName;
    }

    /**
     * Get the employee's full address.
     */
    public function getFullAddressAttribute()
    {
        return "{$this->street}, {$this->barangay}, {$this->city_or_municipality}, {$this->province}, {$this->region}";
    }
}
