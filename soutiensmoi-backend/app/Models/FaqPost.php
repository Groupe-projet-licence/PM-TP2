<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaqPost extends Model {
    protected $fillable = ['user_id', 'titre', 'contenu'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function responses() {
        return $this->hasMany(FaqResponse::class);
    }
}
