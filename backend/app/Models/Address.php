<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'address',
        'country',
        'province',
        'city',
        'street',
        'zipcode',
        'applicant_id'
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }

    public function jobPosting()
    {
        return $this->hasMany(JobPosting::class);
    }
}
