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
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }
}
