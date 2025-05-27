<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model {
    protected $fillable = ['user_id', 'session_id', 'note', 'commentaire'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function session() {
        return $this->belongsTo(Session::class);
    }
}
