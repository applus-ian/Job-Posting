<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = 'feedbacks';
    protected $fillable = [
        'rating',
        'comment',
        'interview_id',
    ];

    public function interview()
    {
        return $this->belongsTo(Interview::class);
    }
}
