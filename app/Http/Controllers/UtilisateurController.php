<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;

class UtilisateurController extends Controller
{
    public function index()
    {
        return response()->json(Utilisateur::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:utilisateurs',
            'motDePasse' => 'required|string|min:6',
            'role' => 'required|string',
        ]);

        $data = $request->all();
        $data['motDePasse'] = bcrypt($data['motDePasse']);
        $utilisateur = Utilisateur::create($data);
        return response()->json($utilisateur, 201);
    }

    public function show($id)
    {
        return response()->json(Utilisateur::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->update($request->all());
        return response()->json($utilisateur);
    }

    public function destroy($id)
    {
        Utilisateur::findOrFail($id)->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }
}