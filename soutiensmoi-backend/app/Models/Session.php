<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model {
    protected $fillable = [
        'student_id', 'tutor_id', 'matiere', 'date', 'heure', 'mode', 'status'
    ];

    public function student() {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function tutor() {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function feedback() {
        return $this->hasOne(Feedback::class);
    }
}
