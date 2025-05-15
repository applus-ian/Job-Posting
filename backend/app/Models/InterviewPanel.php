<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterviewPanel extends Model
{
    use HasFactory;

    protected $fillable = [
        'interview_id',
    ];

    public function interview()
    {
        return $this->belongsTo(Interview::class);
    }
}
