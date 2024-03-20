<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;



class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'profile_picture',
        'user_type', // Add 'user_type' to the $fillable array
        'verification_token',
        'verified',
        'bio_data_path',

    ];

    /**
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

}
