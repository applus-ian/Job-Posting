<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'status',
        'application_id',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function document()
    {
        return $this->hasMany(Document::class);
    }
}
