<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Crypt;

class ContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Seed 10 contacts
        foreach (range(1, 10) as $index) {
            DB::table('contacts')->insert([
                'name' => $faker->name,
                'email' => Crypt::encryptString($faker->email),  // Encrypt email before saving
                'phone' => Crypt::encryptString($faker->phoneNumber),  // Encrypt phone before saving
                'message' => $faker->paragraph,  // Add a random message
            ]);
        }
    }
}
