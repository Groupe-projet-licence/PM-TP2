<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\FaqPostController;
use App\Http\Controllers\FaqResponseController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Toutes les routes de l'API REST (backend Laravel)
|--------------------------------------------------------------------------
*/

// ============ PUBLIC ROUTES ============ //
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ============ PROTECTED ROUTES ============ //
Route::middleware('auth:sanctum')->group(function () {

    // Authentification
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Alias profil utilisateur
    Route::get('/profile', function (Request $request) {
        return response()->json(['user' => $request->user()]);
    });

    // Compétences
    Route::apiResource('skills', SkillController::class);

    // Sessions
    Route::apiResource('sessions', SessionController::class);

    // Feedbacks
    Route::apiResource('feedbacks', FeedbackController::class);

    // Messages
    Route::apiResource('messages', MessageController::class);

    // FAQ
    Route::apiResource('faq-posts', FaqPostController::class);
    Route::post('/faq-responses', [FaqResponseController::class, 'store']);
    Route::post('/faq-responses/{id}/vote', [FaqResponseController::class, 'vote']);
    Route::delete('/faq-responses/{id}', [FaqResponseController::class, 'destroy']);

    //Lister les tuteurs
    Route::get('/tutors', function () {
    return \App\Models\User::where('role', 'tuteur')->with('skills', 'feedbacks')->get();});



    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::get('/users/search', [UserController::class, 'search']);
});
