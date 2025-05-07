<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    // Fillable fields for mass assignment
    protected $fillable = ['user_id', 'bio', 'subjects', 'hourly_rate'];

    /**
     * A tutor belongs to a user (the tutor's account).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

