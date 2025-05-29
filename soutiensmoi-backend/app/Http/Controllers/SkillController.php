<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;

class SkillController extends Controller {
    public function index() {
        return Skill::with('user')->get();
    }

    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'matiere' => 'required|string',
            'niveau' => 'required|string',
        ]);

        $skill = Skill::create($request->all());

        return response()->json($skill, 201);
    }

    public function show($id) {
        return Skill::with('user')->findOrFail($id);
    }

    public function update(Request $request, $id) {
        $skill = Skill::findOrFail($id);
        $skill->update($request->only(['matiere', 'niveau']));

        return response()->json($skill);
    }

    public function destroy($id) {
        $skill = Skill::findOrFail($id);
        $skill->delete();

        return response()->json(['message' => 'Supprimé avec succès']);
    }
}
