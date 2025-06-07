<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    // Lister toutes les compétences
    public function index()
    {
        return Skill::all();
    }

    // Créer une nouvelle compétence (admin)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string|max:50',
        ]);

        $skill = Skill::create($request->all());
        return response()->json($skill, 201);
    }

    // Supprimer une compétence (admin)
    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(null, 204);
    }
}