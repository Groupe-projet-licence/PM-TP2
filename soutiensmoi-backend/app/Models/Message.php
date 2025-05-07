<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['session_id', 'sender_id', 'content'];

    /**
     * A message belongs to a session.
     */
    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    /**
     * A message belongs to a sender (User).
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
