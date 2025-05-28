<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens,HasFactory, Notifiable;

    protected $fillable = ['name','email','password','role','avatar','bio','note','skills','level','image','image_mime'];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'skills' => 'array'
    ];

    // Relations

    public function skills()
    {
        return $this->hasMany(\App\Models\Skill::class);
    }

    public function feedbacks()
    {
        return $this->hasMany(\App\Models\Feedback::class);
    }

    public function sessionsAsStudent()
    {
        return $this->hasMany(Session::class, 'student_id');
    }

    public function sessionsAsTutor()
    {
        return $this->hasMany(Session::class, 'tutor_id');
    }


    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
