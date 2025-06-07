<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RatingSeeder extends Seeder
{
    public function run(): void
    {
        // Récupérer les élèves et tuteurs
        $students = User::where('role', 'student')->pluck('id')->toArray();
        $tutors = User::where('role', 'tutor')->pluck('id')->toArray();

        // Vérifier qu'il y a des élèves et des tuteurs
        if (empty($students) || empty($tutors)) {
            return;
        }

        // Générer des notes pour quelques combinaisons élève/tuteur
        $ratings = [
            [
                'student_id' => $students[0], // Ex. Charlie
                'tutor_id' => $tutors[0], // Ex. Alice
                'rating' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => $students[0], // Ex. Charlie
                'tutor_id' => $tutors[1], // Ex. Bob
                'rating' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => $students[1], // Ex. Diana
                'tutor_id' => $tutors[0], // Ex. Alice
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insérer les données dans la table ratings
        foreach ($ratings as $rating) {
            Rating::create($rating);
        }
    }
}