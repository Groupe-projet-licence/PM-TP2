<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;
use App\Models\Session;

class FeedbackController extends Controller
{
    // All routes require authentication
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Submit feedback for a completed session (student only)
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'session_id' => 'required|exists:sessions,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string'
        ]);

        $session = Session::findOrFail($validated['session_id']);

        // Ensure the current user was the student in the session
        if ($session->student_id !== $request->user()->id) {
            return response()->json(['error' => 'Only the student can leave feedback'], 403);
        }

        // Optionally ensure feedback doesn't already exist
        if ($session->feedback) {
            return response()->json(['error' => 'Feedback already submitted for this session'], 400);
        }

        // Create feedback
        $feedback = Feedback::create($validated);

        return response()->json($feedback, 201);
    }

    // List feedbacks for a specific tutor
    public function indexForTutor($tutorId)
    {
        // Find all feedback where the session's tutor matches
        $feedbacks = Feedback::whereHas('session', function($query) use ($tutorId) {
            $query->where('tutor_id', $tutorId);
        })->get();

        return response()->json($feedbacks);
    }
}
