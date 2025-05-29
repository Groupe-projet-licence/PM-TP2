<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'level' => ['nullable', 'numeric', 'gte:2', 'lte:8'],
            'role' => ['required|in:etudiant,tuteur'],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);

        //Auth::login($user);
        $token = $user->createToken('authToken')->plainTextToken;
        
        return response()->json(['user' => $user, 'token' => $token], 201);

    }
}
