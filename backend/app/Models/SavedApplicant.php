<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedApplicant extends Model
{
    protected $fillable = [
        'applicant_id',
        'job_posting_id'
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }

    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class);
    }
}
