<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Session;

class SessionController extends Controller {
    public function index() {
        return Session::with(['student', 'tutor'])->get();
    }

    public function store(Request $request) {
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'tutor_id' => 'required|exists:users,id',
            'matiere' => 'required|string',
            'date' => 'required|date',
            'heure' => 'required',
            'mode' => 'required|in:visio,présentiel',
        ]);

        $session = Session::create($request->all());
        return response()->json($session, 201);
    }

    public function show($id) {
        return Session::with(['student', 'tutor'])->findOrFail($id);
    }

    public function update(Request $request, $id) {
        $session = Session::findOrFail($id);
        $session->update($request->only(['date', 'heure', 'mode', 'status']));
        return response()->json($session);
    }

    public function destroy($id) {
        $session = Session::findOrFail($id);
        $session->delete();
        return response()->json(['message' => 'Séance supprimée']);
    }
}
