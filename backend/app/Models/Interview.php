<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;
    protected $fillable = [
        'schedule_date',
        'schedule_time',
        'mode',
        'meeting_link',
        'platform',
        'location',
        'status',
        'application_id',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function interviewPanel()
    {
        return $this->hasMany(InterviewPanel::class);
    }

    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }
}
