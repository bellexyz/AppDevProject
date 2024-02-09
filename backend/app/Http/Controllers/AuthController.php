<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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
                'password' => 'required|string|min:6',
                'password_confirmation' => 'required|string|min:6|same:password',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = new User();
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->username = $request->input('username');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->save();

            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (\Exception $e) {
            \Log::error('Registration failed: ' . $e->getMessage());

            return response()->json(['message' => 'Registration failed. Please try again.'], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            // Validate incoming request data
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            // Check for validation errors
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Attempt to log the user in
            if (Auth::attempt($request->only('email', 'password'))) {
                // Authentication successful
                $user = Auth::user();
                // Generate and return a token 
                $token = $user->createToken('AuthToken')->plainTextToken;
                return response()->json(['token' => $token], 200);
            } else {
                // Authentication failed
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
        } catch (\Exception $e) {
            // Log the exception for debugging purposes
            \Log::error('Login failed: ' . $e->getMessage());

            // Return error response
            return response()->json(['message' => 'Login failed. Please try again.'], 500);
        }
    }
}
