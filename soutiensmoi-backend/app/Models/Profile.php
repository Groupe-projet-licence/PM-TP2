<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = ['user_id', 'bio', 'avatar_url', 'location'];

    /**
     * A profile belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
