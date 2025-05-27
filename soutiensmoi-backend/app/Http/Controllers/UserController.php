<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Liste des tuteurs
    public function index()
    {
        return User::where('role', 'tuteur')->with('skills', 'feedbacks')->get();
    }

    // Profil public d’un tuteur
    public function show($id)
    {
        $user = User::with('skills', 'feedbacks')->findOrFail($id);

        if ($user->role !== 'tuteur') {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        return response()->json($user);
    }

    // Recherche par mot-clé (nom ou compétence)
    public function search(Request $request)
    {
        $query = $request->input('q');

        $results = User::where('role', 'tuteur')
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%$query%")
                  ->orWhereHas('skills', function ($sub) use ($query) {
                      $sub->where('name', 'like', "%$query%");
                  });
            })
            ->with('skills', 'feedbacks')
            ->get();

        return response()->json($results);
    }
}
