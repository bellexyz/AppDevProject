<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;
use App\Mail\ResendVerificationEmail; 
use Carbon\Carbon;



class AuthController extends Controller
{
    public function register(Request $request)
    {
    try {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => [
                'required',
                'string',
                'min:6',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            ],
            'password_confirmation' => 'required|string|min:6|same:password',
            'profile_picture' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
            'user_type' => 'required|string', 
            'bio_data_path' => $request->input('user_type') === 'artist' ? 'required|file|mimes:pdf,doc,docx|max:4096' : '',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures');
        }

        $verificationToken = Str::random(60);
        $expiryTime = Carbon::now()->addMinutes(30); 


        if ($request->hasFile('profile_picture')) {
            $profilePicture = $request->file('profile_picture');

            $hashedProfilePicture = hash_file('sha256', $profilePicture->path()) . time();

            $path = $profilePicture->store('profile_pictures');
        }
        if ($request->hasFile('bio_data_path')) {
            $bioDataFile = $request->file('bio_data_path');
            $bioDataPath = $bioDataFile->store('public/bio_data'); 
            $userData['bio_data_path'] = $bioDataPath; 
        }
        
        
        
        
        

        $userData = [
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'verification_token' => $verificationToken, 
            'user_type' => $request->input('user_type'), 
            'bio_data_path' => isset($bioDataPath) ? $bioDataPath : null, 
        ];
        

        if (isset($path)) {
            $userData['profile_picture'] = $hashedProfilePicture;
        }

        $user = User::create($userData);

        Mail::to($user->email)->send(new VerifyEmail($verificationToken));

        return response()->json(['message' => 'User registered successfully'], 201);
    } catch (\Exception $e) {
        \Log::error('File upload error: ' . $e->getMessage());
        return response()->json(['message' => 'File upload failed. Please try again.'], 500);
    }
}

    public function login(Request $request)
{
    try {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->plainTextToken;

            if ($user->user_type === 'artist') {
                return response()->json(['token' => $token, 'redirect' => '/ArtistDashboard'], 200);
            } elseif ($user->user_type === 'listener') {
                return response()->json(['token' => $token, 'redirect' => '/ListenerDashboard'], 200);
            } elseif ($user->user_type === 'superadmin') {
                return response()->json(['token' => $token, 'redirect' => '/AdminArtist'], 200);
            } else {
                return response()->json(['message' => 'Unknown user type'], 403);
            }
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    } catch (\Exception $e) {
        \Log::error('Login failed: ' . $e->getMessage());
        return response()->json(['message' => 'Login failed. Please try again.'], 500);
    }
}

            
    public function verifyEmail($token)
{
    try {
        $user = User::where('verification_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid verification token'], 404);
        }

        $user->update(['verified' => true]);

        return response()->json(['message' => 'Email verified successfully'], 200);
    } catch (\Exception $e) {
        \Log::error('Failed to verify email: ' . $e->getMessage());

        if ($e instanceof \Illuminate\Database\QueryException) {
            return response()->json(['message' => 'Database error occurred. Please try again.'], 500);
        } else {
            return response()->json(['message' => 'An unexpected error occurred. Please try again later.'], 500);
        }
    }
}

}