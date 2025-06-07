<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'tutor_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // Vérifier que student_id est un élève et tutor_id est un tuteur
        $student = User::where('id', $request->student_id)->where('role', 'student')->first();
        $tutor = User::where('id', $request->tutor_id)->where('role', 'tutor')->first();

        if (!$student || !$tutor) {
            return response()->json(['error' => 'Utilisateur invalide'], 422);
        }

        // Vérifier si l'élève a déjà noté ce tuteur
        $existingRating = Rating::where('student_id', $request->student_id)
            ->where('tutor_id', $request->tutor_id)
            ->first();

        if ($existingRating) {
            return response()->json(['error' => 'Vous avez déjà noté ce tuteur'], 422);
        }

        $rating = Rating::create([
            'student_id' => $request->student_id,
            'tutor_id' => $request->tutor_id,
            'rating' => $request->rating,
        ]);

        return response()->json($rating, 201);
    }
}