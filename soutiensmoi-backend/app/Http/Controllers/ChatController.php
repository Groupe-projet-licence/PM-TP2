<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Session;

class ChatController extends Controller
{
    // Require authentication for chat
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // List messages for a session
    public function index(Request $request, $sessionId)
    {
        $session = Session::findOrFail($sessionId);
        $user = $request->user();

        // Ensure user is part of this session
        if ($session->student_id !== $user->id && $session->tutor_id !== $user->tutor?->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Return all messages for this session
        $messages = $session->messages()->with('sender')->get();
        return response()->json($messages);
    }

    // Send a new message in a session
    public function store(Request $request, $sessionId)
    {
        $session = Session::findOrFail($sessionId);
        $user = $request->user();

        // Ensure user is part of this session
        if ($session->student_id !== $user->id && $session->tutor_id !== $user->tutor?->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validate message content
        $validated = $request->validate([
            'content' => 'required|string'
        ]);

        // Create message
        $message = Message::create([
            'session_id' => $sessionId,
            'sender_id' => $user->id,
            'content' => $validated['content']
        ]);

        return response()->json($message, 201);
    }
}
