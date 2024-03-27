<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $fillable = ['artist', 'file_path', 'cover_path', 'description', 'album_id', 'song_name'];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'music_genre');
    }
}
