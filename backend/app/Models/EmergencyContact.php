<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmergencyContact extends Model
{
    protected $fillable = [
        'full_name',
        'phone_number',
        'applicant_id',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }
}
