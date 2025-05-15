<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class  JobPosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'requirements',
        'vacancies',
        'salary_type',
        'salary_min',
        'salary_max',
        'employment_type',
        'employment_level',
        'work_setup',
        'status',
        'address_id',
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function savedJob()
    {
        return $this->hasMany(SavedJob::class);
    }
}
