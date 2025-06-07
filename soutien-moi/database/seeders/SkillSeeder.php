<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run()
    {
        $skills = [
            ['name' => 'Java', 'level' => 'NIV1'],
            ['name' => 'Java', 'level' => 'NIV2'],
            ['name' => 'Python', 'level' => 'NIV1'],
            ['name' => 'Python', 'level' => 'NIV2'],
            ['name' => 'Réseaux', 'level' => 'NIV1'],
            ['name' => 'Réseaux', 'level' => 'NIV2'],
            ['name' => 'Base de données', 'level' => 'NIV1'],
            ['name' => 'Base de données', 'level' => 'NIV2'],
            ['name' => 'JavaScript', 'level' => 'NIV1'],
            ['name' => 'JavaScript', 'level' => 'NIV2'],
            ['name' => 'PHP', 'level' => 'NIV1'],
            ['name' => 'Laravel', 'level' => 'NIV2'],
            ['name' => 'HTML/CSS', 'level' => 'NIV1'],
            ['name' => 'Docker', 'level' => 'NIV2'],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}