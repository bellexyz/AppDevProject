<?php

namespace App\Http\Controllers;

use App\Models\VerifyAccount;
use Illuminate\Http\Request;

class VerifyAccountController extends Controller
{
    public function index()
    {
        $verifyAccounts = VerifyAccount::all();
        return response()->json($verifyAccounts);
    }
}

