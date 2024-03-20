<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = ['name'];

    public function music()
    {
        return $this->belongsToMany(Music::class, 'music_genre');
    }
}
