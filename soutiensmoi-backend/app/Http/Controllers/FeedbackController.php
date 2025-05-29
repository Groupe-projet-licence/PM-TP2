<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller {
    public function index() {
        return Feedback::with(['user', 'session'])->get();
    }

    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'session_id' => 'required|exists:sessions,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string',
        ]);

        $feedback = Feedback::create($request->all());
        return response()->json($feedback, 201);
    }

    public function show($id) {
        return Feedback::with(['user', 'session'])->findOrFail($id);
    }

    public function destroy($id) {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return response()->json(['message' => 'Feedback supprimé']);
    }
}
