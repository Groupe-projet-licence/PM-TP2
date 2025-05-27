<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model {
    protected $fillable = ['expediteur_id', 'destinataire_id', 'texte', 'envoye_le'];

    public function expediteur() {
        return $this->belongsTo(User::class, 'expediteur_id');
    }

    public function destinataire() {
        return $this->belongsTo(User::class, 'destinataire_id');
    }
}
