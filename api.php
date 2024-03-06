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
Route::middleware('auth:api')->get('/user/verification-status', [AuthController::class, 'getUserVerificationStatus']);
Route::get('/verify-accounts', [VerifyAccountController::class, 'index']);
//Route::post('/ban-account', [BanListController::class, 'store']);
//Route::get('/users', [UserController::class, 'index']);
Route::post('/music/upload', [MusicController::class, 'upload']);
Route::get('/music', [MusicController::class, 'index']);

Route::get('/music/{filename}', function ($filename) {
    $path = public_path('music/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    return response()->file($path);
});


