<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    protected $table = 'music'; 

    protected $fillable = ['title', 'file_path', 'cover_path', 'description']; 
}
