<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Music;
use Illuminate\Support\Facades\Storage;


class MusicController extends Controller
{
   /* public function upload(Request $request)
    {
        try {
            if ($request->hasFile('music')) {
                $musicFile = $request->file('music');
                $path = $musicFile->store('music');
    
                // Save music details to the database
                $music = new Music();
                $music->title = $request->input('title');
                $music->artist = $request->input('artist');
                $music->file_path = $path; // Store the file path in the database
                $music->save();

                // Get the URL of the uploaded music file
                $url = Storage::url($path);

                return response()->json(['message' => 'Music uploaded successfully', 'musicUrl' => $url]);



                return response()->json(['message' => 'Music uploaded successfully']);
            } else {
                return response()->json(['message' => 'No music file uploaded'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error uploading music: ' . $e->getMessage()], 500);
        }
    }*/

    public function upload(Request $request)
{
    try {
        if ($request->hasFile('music')) {
            $musicFile = $request->file('music');
            $fileName = $musicFile->getClientOriginalName(); // Get the original file name
            $path = $musicFile->storeAs('public/music', $fileName); // Store the file in the public/music directory

            // Save music details to the database
            $music = new Music();
            $music->title = $request->input('title');
            $music->artist = $request->input('artist');
            $music->file_path = 'storage/music/' . $fileName; // Store the relative file path in the database
            $music->save();

            // Construct the URL of the uploaded music file
            $url = asset('storage/music/' . $fileName); // Get the publicly accessible URL

            return response()->json(['message' => 'Music uploaded successfully', 'musicUrl' => $url]);
        } else {
            return response()->json(['message' => 'No music file uploaded'], 400);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error uploading music: ' . $e->getMessage()], 500);
    }
}


    public function index()
    {
        try {
            $musicFiles = Music::all(); // Assuming you have a Music model
            return response()->json($musicFiles);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching music: ' . $e->getMessage()], 500);
        }
    }
}
