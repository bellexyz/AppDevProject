<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Music;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class MusicController extends Controller
{
    public function upload(Request $request)
    {
        try {
            if ($request->hasFile('music') && $request->hasFile('cover')) {
                $musicFile = $request->file('music');
                $coverFile = $request->file('cover');

                $existingMusic = Music::where('file_path', 'storage/music/' . $musicFile->getClientOriginalName())->first();
                if ($existingMusic) {
                    return response()->json(['message' => 'File already exists in the database.'], 400);
                }

                $fileName = $musicFile->getClientOriginalName();
                $coverName = $coverFile->getClientOriginalName();
                $path = $musicFile->storeAs('public/music', $fileName);
                $coverPath = $coverFile->storeAs('public/covers', $coverName);

                $music = new Music();
                $music->title = $request->input('title');
                $music->artist = $request->input('artist');
                $music->file_path = 'storage/music/' . $fileName;
                $music->cover_path = 'storage/covers/' . $coverName;
                $music->description = $request->input('description');
                $music->save();

                $url = asset('storage/music/' . $fileName);
                return response()->json(['message' => 'Music uploaded successfully', 'musicUrl' => $url]);
            } else {
                return response()->json(['message' => 'Please select both a music file and a cover image'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error uploading music: ' . $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $musicFiles = Music::all(['id', 'title', 'artist', 'file_path', 'cover_path', 'description']);

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
}
