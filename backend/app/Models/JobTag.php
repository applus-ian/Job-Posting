<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobTag extends Model
{
    protected $fillable = [
        'tag',
        'job_id',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
