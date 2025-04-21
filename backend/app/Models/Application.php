<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'applied_date',
        'status',
        'applicant_id',
        'job_id',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function applicationStatus()
    {
        return $this->hasMany(ApplicationStatus::class);
    }

    public function interview()
    {
        return $this->hasOne(Interview::class);
    }
}
