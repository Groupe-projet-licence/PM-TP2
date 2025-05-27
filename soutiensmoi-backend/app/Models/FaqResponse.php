<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaqResponse extends Model {
    protected $fillable = ['faq_post_id', 'user_id', 'contenu', 'votes'];

    public function faqPost() {
        return $this->belongsTo(FaqPost::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
