<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Music;
use App\Models\Album;
use App\Models\Genre; // Import the Genre model
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth; // Import the Auth facade


class MusicController extends Controller
{
    public function upload(Request $request)
{
    try {
        // Check if files are present
        if ($request->hasFile('music') && $request->hasFile('cover')) {
            // Handle album upload logic
            $album = new Album();
            $album->title = $request->input('album_title');
            $album->cover_path = 'storage/covers/' . $request->file('cover')->getClientOriginalName();
            $album->save();

            foreach ($request->file('music') as $index => $musicFile) {
                $fileName = $musicFile->getClientOriginalName();
                $path = $musicFile->storeAs('public/music', $fileName);
            
                $music = new Music();
                $music->artist = $request->input('artist');
                $music->file_path = 'storage/music/' . $fileName;
                $music->cover_path = $album->cover_path;
                $music->description = $request->input('description'); 
                $music->album_id = $album->id;
                $music->save();
            
                // Extract genre names from request and associate with music
                $genreNames = json_decode($request->input('genres')[$index], true);
            
                // Get genre IDs from names
                $genreIds = [];
                foreach ($genreNames as $genreName) {
                    $genre = Genre::firstOrCreate(['name' => $genreName]);
                    $genreIds[] = $genre->id;
                }
            
                // Attach genre IDs to the music
                $music->genres()->syncWithoutDetaching($genreIds);
            }
            
            return response()->json(['message' => 'Album uploaded successfully']);
        } else {
            return response()->json(['message' => 'Please select both music files and a cover image'], 400);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error uploading album: ' . $e->getMessage()], 500);
    }
}

    


    public function index()
    {
        try {
            $musicFiles = Music::all(['id', 'artist', 'file_path', 'cover_path', 'description']);
            $musicFiles = $musicFiles->map(function ($music) {
                $music->fullUrl = asset($music->file_path);
                $music->coverUrl = asset($music->cover_path);
                return $music;
            });

            return response()->json($musicFiles);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching music: ' . $e->getMessage()], 500);
        }
    }

    public function getFavoriteMusic(Request $request)
    {
        try {
            $favoriteSongs = $request->input('favoriteSongs');
            $favoriteMusic = Music::whereIn('id', $favoriteSongs)->get(['id', 'title', 'artist', 'file_path', 'cover_path', 'description']);
            
            return response()->json($favoriteMusic);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching favorite music: ' . $e->getMessage()], 500);
        }
    }

    public function getAlbumsWithMusic()
    {
        try {
            // Fetch albums along with their associated music
            $albums = Album::with('music')->get();

            // Return the albums with their associated music as JSON response
            return response()->json($albums);
        } catch (\Exception $e) {
            // Handle any errors and return an error response
            return response()->json(['message' => 'Error fetching albums with music: ' . $e->getMessage()], 500);
        }
    }

    
    public function getSongsByGenre($genreName)
    {
        try {
            $genre = Genre::where('name', $genreName)->first(); // Find the genre by name
            if (!$genre) {
                return response()->json(['message' => 'Genre not found'], 404);
            }
            
            // Eager load songs associated with the found genre
            $songs = $genre->songs()->get(['id', 'title', 'artist', 'description']);
            return response()->json($songs);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching songs by genre: ' . $e->getMessage()], 500);
        }
    }
    
}
