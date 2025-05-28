<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;


class ProfilController extends Controller
{


    public function index(SearchRequest $request)
    {

        $query = User::query();
        if ($skill = $request->validated('skill')) {
            $query = $query->whereJsonContains('skills', $skill);
        }
        if ($level = $request->validated('level')) {
            $query = $query->where('level', '>=', $level);
        }
        $query = $query->orderBy('note', 'desc')->get();

        return response()->json(['users' => $query]);

    }
    public function edit(Request $request)
    {
        $user = $request->user();
        $user->image = $user->image ? base64_encode($user->image) : null;
        return response()->json(['user' => $user]);

    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\password::defaults()],
            'note' => ['nullable', 'float'],
            'skills' => ['array', 'nullable', 'lowercase'],
            'level' => ['nullable', 'numeric', 'gte:2', 'lte:8'],
            'image' => ['nullable', 'image', 'max:2000']
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $validated['image'] = file_get_contents($image->getRealPath());
            $validated['image_mime'] = $image->getMimeType();
        }
        if ($request->has('password')) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user = $request->user();
        $user->update($validated);
        //event(new Registered($user));
        return response()->noContent();
    }
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
