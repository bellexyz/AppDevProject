<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request, $userType)
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
                'profile_picture' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Define validation rules for profile picture upload
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Handle file upload
            if ($request->hasFile('profile_picture')) {
                $path = $request->file('profile_picture')->store('profile_pictures');
            }
            
            // Handle file upload and generate a unique hash for each profile picture
            if ($request->hasFile('profile_picture')) {
                $profilePicture = $request->file('profile_picture');

                // Generate a unique hash for the profile picture using current timestamp
                $hashedProfilePicture = hash_file('sha256', $profilePicture->path()) . time();

                // Store the profile picture and update the user's record with the unique hash
                $path = $profilePicture->store('profile_pictures');
            }
            $userData = [
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
            ];
            
            if (isset($path)) {
                $userData['profile_picture'] = $hashedProfilePicture; 
            }
            
            User::create($userData);
            

            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (\Exception $e) {
            \Log::error('Registration failed: ' . $e->getMessage());

            return response()->json(['message' => 'Registration failed. Please try again.'], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->only('username', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('AuthToken')->plainTextToken;
                return response()->json(['token' => $token], 200);
            } else {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
        } catch (\Exception $e) {
            \Log::error('Login failed: ' . $e->getMessage());
            return response()->json(['message' => 'Login failed. Please try again.'], 500);
        }
    }
}