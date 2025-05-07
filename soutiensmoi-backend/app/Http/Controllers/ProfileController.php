<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    // All profile routes require authentication
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Show current user's profile
    public function show(Request $request)
    {
        $profile = $request->user()->profile;
        return response()->json($profile);
    }

    // Create or update current user's profile
    public function storeOrUpdate(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'bio' => 'nullable|string',
            'avatar_url' => 'nullable|url',
            'location' => 'nullable|string'
        ]);

        $user = $request->user();

        // Either update existing or create new profile
        $profile = Profile::updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return response()->json($profile);
    }
}
