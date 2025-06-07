<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:users,name',
            'role' => 'required|in:tutor,student',
            'password' => 'required|string|min:3',
            'skill_name' => 'required_if:role,tutor|string',
            'skill_level' => 'required_if:role,tutor|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        if ($request->role === 'tutor') {
            // Vérifier si la compétence existe, sinon la créer
            $skill = Skill::firstOrCreate(
                ['name' => $request->skill_name, 'level' => $request->skill_level],
                ['created_at' => now(), 'updated_at' => now()]
            );

            // Associer la compétence au tuteur
            DB::table('skill_user')->insert([
                'user_id' => $user->id,
                'skill_id' => $skill->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response()->json(['user' => ['id' => $user->id, 'name' => $user->name, 'role' => $user->role]], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('name', $request->name)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Nom ou mot de passe incorrect'], 401);
        }

        return response()->json(['user' => ['id' => $user->id, 'name' => $user->name, 'role' => $user->role]]);
    }
}