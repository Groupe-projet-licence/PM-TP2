<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;

class SessionController extends Controller
{
    // All session routes require authentication
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // List all sessions for the authenticated user
    public function index(Request $request)
    {
        $user = $request->user();

        // If user is a tutor, get their sessions; otherwise, sessions as student
        if ($user->tutor) {
            // User is a tutor (has a Tutor profile)
            $sessions = Session::where('tutor_id', $user->tutor->id)->get();
        } else {
            // User is a student
            $sessions = Session::where('student_id', $user->id)->get();
        }

        return response()->json($sessions);
    }

    // Show a specific session by ID (if user is involved)
    public function show(Request $request, $id)
    {
        $session = Session::findOrFail($id);
        $user = $request->user();

        // Ensure user is either the tutor or the student in this session
        if ($session->tutor_id !== $user->tutor?->id && $session->student_id !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($session);
    }

    // Schedule a new session (student initiates)
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'tutor_id' => 'required|exists:tutors,id',
            'scheduled_at' => 'required|date|after:now'
        ]);

        // Create session with status 'pending'
        $session = Session::create([
            'tutor_id' => $validated['tutor_id'],
            'student_id' => $request->user()->id,
            'scheduled_at' => $validated['scheduled_at'],
            'status' => 'pending'
        ]);

        return response()->json($session, 201);
    }

    // Update session status or details (typically by tutor)
    public function update(Request $request, $id)
    {
        $session = Session::findOrFail($id);
        $user = $request->user();

        // Only the tutor can update the session status
        if ($session->tutor_id !== $user->tutor?->id) {
            return response()->json(['error' => 'Only the tutor can update this session'], 403);
        }

        // Validate status update
        $validated = $request->validate([
            'status' => 'required|in:accepted,declined,completed'
        ]);

        $session->status = $validated['status'];
        $session->save();

        return response()->json($session);
    }

    // Cancel or delete a session (by student or tutor)
    public function destroy(Request $request, $id)
    {
        $session = Session::findOrFail($id);
        $user = $request->user();

        // Only involved parties can delete
        if ($session->student_id !== $user->id && $session->tutor_id !== $user->tutor?->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $session->delete();
        return response()->json(['message' => 'Session cancelled']);
    }
}
