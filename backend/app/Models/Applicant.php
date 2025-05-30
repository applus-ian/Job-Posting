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
    ];

    // accessor
    public function getFullNameAttribute()
    {
        $parts = array_filter([
            $this->first_name,
            $this->middle_name,
            $this->last_name,
            $this->suffix,
        ]);

        return implode(' ', $parts);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class, 'applicant_id', 'id');
    }

    public function application()
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

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function emergencyContact()
    {
        return $this->hasMany(EmergencyContact::class);
    }

    public function language()
    {
        return $this->hasMany(Language::class);
    }

    public function savedJob()
    {
        return $this->hasMany(SavedJob::class);
    }
}
