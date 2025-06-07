<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillUserSeeder extends Seeder
{
    public function run(): void
    {
        $skillUser = [
            ['user_id' => 1, 'skill_id' => 1], // Alice : Mathématiques Niveau 1
            ['user_id' => 2, 'skill_id' => 1], // Bob : Mathématiques Niveau 1
            ['user_id' => 2, 'skill_id' => 2], // Bob : Mathématiques Niveau 2
            ['user_id' => 3, 'skill_id' => 3], // Charlie : Informatique Niveau 1
            ['user_id' => 4, 'skill_id' => 1], // Diana : Mathématiques Niveau 1
            ['user_id' => 4, 'skill_id' => 3], // Diana : Informatique Niveau 1
        ];

        foreach ($skillUser as $relation) {
            DB::table('skill_user')->insert([
                'user_id' => $relation['user_id'],
                'skill_id' => $relation['skill_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}