<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\CompteController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\AnnonceInstitutionnelleController;
use App\Http\Controllers\ActualiteController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ProgrammeAnnuelController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\AuthController;

// Routes publiques
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Routes publiques lecture
Route::get('clubs', [ClubController::class, 'index']);
Route::get('clubs/{id}', [ClubController::class, 'show']);
Route::get('actualites', [ActualiteController::class, 'index']);
Route::get('evenements', [EvenementController::class, 'index']);
Route::get('annonces', [AnnonceInstitutionnelleController::class, 'index']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    // Profil et logout
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profil', [AuthController::class, 'profil']);

    // Gestion
    Route::apiResource('utilisateurs', UtilisateurController::class);
    Route::apiResource('comptes', CompteController::class);
    Route::apiResource('clubs', ClubController::class);
    Route::apiResource('annonces', AnnonceInstitutionnelleController::class);
    Route::apiResource('actualites', ActualiteController::class);
    Route::apiResource('evenements', EvenementController::class);
    Route::apiResource('activites', ActiviteController::class);
    Route::apiResource('programmes', ProgrammeAnnuelController::class);
    Route::apiResource('inscriptions', InscriptionController::class);
    Route::apiResource('medias', MediaController::class);
});
