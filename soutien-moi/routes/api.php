<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

//Route pour lauthentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Route::get('/user', function (Request $request) {return $request->user();});
//Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
Route::post('/messages', [MessageController::class, 'store']);
Route::get('/messages', [MessageController::class, 'index']);
Route::get('/users', [MessageController::class, 'users']);
Route::get('/students', [MessageController::class, 'students']);
Route::get('/skills', [MessageController::class, 'skills']);
Route::get('/users-by-skill', [MessageController::class, 'usersBySkill']);

//Systeme de notation
Route::post('/ratings', [RatingController::class, 'store']);

//Route des competences
Route::get('/skills', [SkillController::class, 'index']);

