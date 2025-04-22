<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EducationHistory extends Model
{
    protected $fillable = [
        'school',
        'degree',
        'course',
        'start_year',
        'end_year',
        'applicant_id',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }
}
