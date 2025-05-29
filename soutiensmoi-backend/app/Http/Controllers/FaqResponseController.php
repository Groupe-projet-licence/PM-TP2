<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FaqResponse;

class FaqResponseController extends Controller {
    public function store(Request $request) {
        $request->validate([
            'faq_post_id' => 'required|exists:faq_posts,id',
            'user_id' => 'required|exists:users,id',
            'contenu' => 'required|string',
        ]);

        return FaqResponse::create($request->all());
    }

    public function vote($id, Request $request) {
        $reponse = FaqResponse::findOrFail($id);
        $vote = $request->input('vote'); // +1 ou -1

        if (in_array($vote, [1, -1])) {
            $reponse->votes += $vote;
            $reponse->save();
        }

        return response()->json($reponse);
    }

    public function destroy($id) {
        $rep = FaqResponse::findOrFail($id);
        $rep->delete();
        return response()->json(['message' => 'Réponse supprimée']);
    }
}
