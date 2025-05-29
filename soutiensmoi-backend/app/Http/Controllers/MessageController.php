<?php

 namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller {
    public function index() {
        return Message::with(['expediteur', 'destinataire'])->orderBy('envoye_le')->get();
    }

    public function store(Request $request) {
        $request->validate([
            'expediteur_id' => 'required|exists:users,id',
            'destinataire_id' => 'required|exists:users,id',
            'texte' => 'required|string',
        ]);

        $message = Message::create([
            'expediteur_id' => $request->expediteur_id,
            'destinataire_id' => $request->destinataire_id,
            'texte' => $request->texte,
            'envoye_le' => now(),
        ]);

        return response()->json($message, 201);
    }

    public function show($id) {
        return Message::with(['expediteur', 'destinataire'])->findOrFail($id);
    }
}
