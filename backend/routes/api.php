<?php

// routes/api.php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register/{userType}', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
