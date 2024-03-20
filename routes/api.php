<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerifyAccountController;
//use App\Http\Controllers\BanListController;
//use App\Http\Controllers\UserController;
use App\Http\Controllers\MusicController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;


Route::post('/register/{userType}', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
//Route::middleware('auth:api')->get('/user/verification-status', [AuthController::class, 'getUserVerificationStatus']);
//Route::get('/verify-accounts', [VerifyAccountController::class, 'index']);
// Protected routes that require authentication
Route::middleware('auth:sanctum')->group(function () {
    // Routes related to user verification
    Route::get('/user/verification-status', [AuthController::class, 'getUserVerificationStatus']);

    // Route for music upload
    Route::post('/music/upload', [MusicController::class, 'upload']);
});

// Public routes (accessible without authentication)
Route::get('/music', [MusicController::class, 'index']);

Route::get('/music/{filename}', function ($filename) {
    $path = public_path('music/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    return response()->file($path);
});
Route::get('/albums', [MusicController::class, 'getAlbumsWithMusic']);
Route::get('/genres/{genreName}/songs', [MusicController::class, 'getSongsByGenre']);
