<?php

namespace App\Http\Controllers;

use App\Models\AnnonceInstitutionnelle;
use Illuminate\Http\Request;

class AnnonceInstitutionnelleController extends Controller
{
    public function index()
    {
        return response()->json(AnnonceInstitutionnelle::with('auteur')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'contenu' => 'required|string',
            'utilisateur_id' => 'required|exists:utilisateurs,id',
        ]);
        $annonce = AnnonceInstitutionnelle::create($request->all());
        return response()->json($annonce, 201);
    }

    public function show($id)
    {
        return response()->json(AnnonceInstitutionnelle::with('auteur')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $annonce = AnnonceInstitutionnelle::findOrFail($id);
        $annonce->update($request->all());
        return response()->json($annonce);
    }

    public function destroy($id)
    {
        AnnonceInstitutionnelle::findOrFail($id)->delete();
        return response()->json(['message' => 'Annonce supprimée']);
    }
}