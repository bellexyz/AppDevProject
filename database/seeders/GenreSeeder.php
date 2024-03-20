<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Add this line
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Truncate the music_genre table
        DB::table('music_genre')->truncate();

        // Define an array of genres
        $genres = [
            ['name' => 'Rock'],
            ['name' => 'Pop'],
            ['name' => 'Jazz'],
            ['name' => 'Hip Hop'],
            ['name' => 'Classical'],
            ['name' => 'Electronic'],
            ['name' => 'Blues'],
            ['name' => 'Reggae'],
            // Add more genres here if needed
        ];

        // Insert genres into the database
        Genre::insert($genres);
    }
}
