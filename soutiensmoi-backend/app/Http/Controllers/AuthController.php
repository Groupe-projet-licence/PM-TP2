<?php

 namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller {
    public function register(Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6|confirmed',
        'role' => 'required|in:etudiant,tuteur',
        'avatar' => 'nullable|string',
        'bio' => 'nullable|string',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role' => $request->role,
        'avatar' => $request->avatar,
        'bio' => $request->bio,
    ]);

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['user' => $user, 'token' => $token], 201);
}
    public function login(Request $request) {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants invalides.'],
            ]);
        }

        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function logout(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Déconnecté avec succès']);
}

public function user(Request $request) {
    return response()->json($request->user());
}
}
