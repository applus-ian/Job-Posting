<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'status',
        'expected_salary',
        'applicant_id',
        'job_posting_id',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }

    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class);
    }

    public function applicationStatus()
    {
        return $this->hasMany(ApplicationStatus::class);
    }

    public function interview()
    {
        return $this->hasOne(Interview::class);
    }

    public function document()
    {
        return $this->hasMany(Document::class);
    }

    public function offer()
    {
        return $this->hasOne(Offer::class);
    }
}
