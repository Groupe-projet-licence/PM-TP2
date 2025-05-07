<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = ['session_id', 'rating', 'comment'];

    /**
     * A feedback belongs to a session.
     */
    public function session()
    {
        return $this->belongsTo(Session::class);
    }
}
