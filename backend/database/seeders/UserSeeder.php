<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Jeet Parmar',
            'email' => 'jeetparmar.spias@spec.edu.in',
            'password' => Hash::make('Jeet@6587'), // Hash the password
        ]);
        User::create([
            'name' => 'Gohel raj',
            'email' => 'rajgohel.engg@spec.edu.in',
            'password' => Hash::make('Rajgohel@312'),
        ]);
    }
}
