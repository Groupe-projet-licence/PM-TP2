<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutor;

class TutorController extends Controller
{
    // Require authentication for create/update/delete
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    // List all tutors (optionally with filters via query params)
    public function index()
    {
        $tutors = Tutor::with('user')->get();
        return response()->json($tutors);
    }

    // Show a single tutor by ID
    public function show($id)
    {
        $tutor = Tutor::with('user')->findOrFail($id);
        return response()->json($tutor);
    }

    // Create a new tutor profile (authenticated user)
    public function store(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'bio' => 'required|string',
            'subjects' => 'required|string',
            'hourly_rate' => 'required|numeric|min:0'
        ]);

        // Create tutor profile for current user
        $tutor = Tutor::create([
            'user_id' => $request->user()->id,
            'bio' => $validated['bio'],
            'subjects' => $validated['subjects'],
            'hourly_rate' => $validated['hourly_rate']
        ]);

        return response()->json($tutor, 201);
    }

    // Update an existing tutor profile (only if owned by user)
    public function update(Request $request, $id)
    {
        $tutor = Tutor::findOrFail($id);

        // Ensure the authenticated user owns this tutor profile
        if ($request->user()->id !== $tutor->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validate input
        $validated = $request->validate([
            'bio' => 'sometimes|required|string',
            'subjects' => 'sometimes|required|string',
            'hourly_rate' => 'sometimes|required|numeric|min:0'
        ]);

        // Update fields
        $tutor->update($validated);

        return response()->json($tutor);
    }

    // Delete a tutor profile (owner only)
    public function destroy(Request $request, $id)
    {
        $tutor = Tutor::findOrFail($id);
        if ($request->user()->id !== $tutor->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $tutor->delete();
        return response()->json(['message' => 'Tutor profile deleted']);
    }
}
