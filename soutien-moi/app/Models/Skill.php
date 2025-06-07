<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'level'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'skill_user');
    }
}
