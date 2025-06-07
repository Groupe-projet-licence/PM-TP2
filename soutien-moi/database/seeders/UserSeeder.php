<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Alice'],
            ['name' => 'Bob'],
            ['name' => 'Charlie'],
            ['name' => 'Diana'],
            ['name' => 'john'],
            ['name' => 'peire'],
            ['name' => 'wafo'],
            ['name' => 'gims'],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}