<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Models\Skill;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);

        return response()->json($message, 201);
    }

    public function index(Request $request)
    {
        $sender_id = $request->query('sender_id');
        $receiver_id = $request->query('receiver_id');

        $messages = Message::where(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $sender_id)->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $receiver_id)->where('receiver_id', $sender_id);
        })->with(['sender', 'receiver'])->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }

    public function users()
    {
        $users = User::select('id', 'name', 'role')->get();
        return response()->json($users);
    }

    public function students()
    {
        $students = User::where('role', 'student')->select('id', 'name')->get();
        return response()->json($students);
    }

    public function skills()
    {
        $skills = Skill::select('id', 'name', 'level')->get();
        return response()->json($skills);
    }

    public function usersBySkill(Request $request)
    {
        $skill_id = $request->query('skill_id');
        $users = User::where('role', 'tutor')
            ->whereHas('skills', function ($query) use ($skill_id) {
                $query->where('skills.id', $skill_id);
            })
            ->select('id', 'name')
            ->with('ratingsReceived')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'average_rating' => round($user->average_rating, 1),
                ];
            });
        return response()->json($users);
    }
}