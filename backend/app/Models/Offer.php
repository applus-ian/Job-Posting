<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'salary',
        'description',
        'sent_at',
        'start_date',
        'expiry_date',
        'status',
        'applicant_id',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }
}
