<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationStatus extends Model
{
    protected $fillable = [
        'status',
        'application_id',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
