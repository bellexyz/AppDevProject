<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert super admin data into the database
        DB::table('users')->insert([
            'username' => 'MeloMixers',
            'email' => 'MeloMixers@gmail.com',
            'password' => Hash::make('MeloMixers123'), // Hash the password for security
            'first_name' => 'MeloMixers',
            'last_name' => 'MeloMixers',
            'profile_picture' => '',
            'user_type' => 'superadmin', // Set user type to 'superadmin'
            'bio_data_path' => '',
            'verification_token' => '',
            'verified' => true, // Set to true or false as needed
        ]);
    }
}
