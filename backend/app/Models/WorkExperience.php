<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    protected $fillable = [
        'company',
        'professional_title',
        'description',
        'start_date',
        'end_date',
        'applicant_id',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }
}
