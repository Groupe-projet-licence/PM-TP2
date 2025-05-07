<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $fillable = ['tutor_id', 'student_id', 'scheduled_at', 'status'];

    /**
     * A session belongs to a tutor (via the Tutor model).
     */
    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    /**
     * A session belongs to a student (User model).
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * A session has many chat messages.
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * A session may have one feedback.
     */
    public function feedback()
    {
        return $this->hasOne(Feedback::class);
    }
}
