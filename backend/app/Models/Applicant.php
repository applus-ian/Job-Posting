<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    protected $fillable = [
        'professional_title',
        'biography',
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'sex',
        'date_of_birth',
        'nationality',
        'phone_number',
        'user_id',
        'address_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function educationHistory()
    {
        return $this->hasMany(EducationHistory::class);
    }

    public function workExperience()
    {
        return $this->hasMany(WorkExperience::class);
    }

    public function emergencyContact()
    {
        return $this->hasMany(EmergencyContact::class);
    }

    public function language()
    {
        return $this->hasMany(Language::class);
    }

    public function offer()
    {
        return $this->hasMany(Offer::class);
    }

    public function savedJob()
    {
        return $this->hasMany(SavedJob::class);
    }
}
