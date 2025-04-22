<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'file_name',
        'file_path',
        'type',
        'applicant_id',
        'application_id',
    ];

    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
