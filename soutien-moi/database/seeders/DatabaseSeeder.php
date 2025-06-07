<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(14)->create();

       User::factory()->create([
            'name' => 'Test User',
        ]);

        $this->call([
            SkillSeeder::class,
            SkillUserSeeder::class,
            RatingSeeder::class,
        ]);
    }
}
