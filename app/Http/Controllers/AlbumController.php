<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Music;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function index()
    {
        $albums = Album::all();
        return response()->json($albums);
    }
    
    public function show($id)
{
    try {
        // Fetch the album details
        $album = Album::findOrFail($id);
        
        // Fetch the associated music entries for the album
        $music = Music::where('album_id', $id)->get();

        // Append the music entries to the album details
        $album->music = $music->map(function ($song) {
            // Retrieve the edited song name if available, otherwise use the original name
            $song->songName = $song->song_name ?: basename($song->file_path, '.'.pathinfo($song->file_path, PATHINFO_EXTENSION));
            return $song;
        });

        return response()->json($album);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['message' => 'Album not found'], 404);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error fetching album details: ' . $e->getMessage()], 500);
    }
}


public function updateSongName(Request $request, $album, $song)
{
    try {
        // Find the album
        $album = Album::findOrFail($album);

        // Find the music entry
        $music = Music::findOrFail($song);

        // Update the song name
        $music->song_name = $request->input('song_name');
        $music->save();

        return response()->json(['message' => 'Song name updated successfully']);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['message' => 'Album or music entry not found'], 404);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error updating song name: ' . $e->getMessage()], 500);
    }
}




}    
