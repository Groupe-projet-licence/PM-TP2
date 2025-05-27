<?php

 namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FaqPost;

class FaqPostController extends Controller {
    public function index() {
        return FaqPost::with('user', 'reponses')->latest()->get();
    }

    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
        ]);

        return FaqPost::create($request->all());
    }

    public function show($id) {
        return FaqPost::with('reponses')->findOrFail($id);
    }

    public function destroy($id) {
        $post = FaqPost::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Question supprimée']);
    }
}
