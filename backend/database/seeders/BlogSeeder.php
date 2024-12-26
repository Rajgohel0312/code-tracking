<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create(); // Create a Faker instance

        // Seed 10 blogs
        foreach (range(1, 10) as $index) {
            DB::table('blogs')->insert([
                'title' => $faker->sentence, // Random blog title
                'content' => $faker->paragraph, // Random blog content
                'author' => $faker->name, // Random author name
                'category' => $faker->word, // Random category (you can customize this as needed)
                'excerpt' => $faker->sentence, // Random excerpt (you can customize this as needed)
                'created_at' => now(), // Set current timestamp
                'updated_at' => now(), // Set current timestamp
            ]);
        }
    }
}
