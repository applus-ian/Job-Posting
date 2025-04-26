<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobTag extends Model
{
    protected $fillable = [
        'tag',
        'job_posting_id',
    ];

    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class);
    }
}
