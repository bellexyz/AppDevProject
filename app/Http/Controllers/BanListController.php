<?php

namespace App\Http\Controllers;

use App\Models\BanList;
use Illuminate\Http\Request;

class BanListController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request if necessary

        $banList = new BanList();
        $banList->name = $request->input('name'); // Assuming 'name' is a field in your BanList table
        // Set other fields as needed
        $banList->save();

        // Delete the record from the VerifyAccount table
        VerifyAccount::destroy($request->input('id')); // Assuming 'id' is the primary key of VerifyAccount

        return response()->json(['message' => 'Account banned successfully']);
    }
}

