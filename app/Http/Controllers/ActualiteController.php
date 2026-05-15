<?php

namespace App\Http\Controllers;

use App\Models\Actualite;
use Illuminate\Http\Request;

class ActualiteController extends Controller
{
    public function index()
    {
        return response()->json(Actualite::with('club')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'contenu' => 'required|string',
            'club_id' => 'required|exists:clubs,id',
        ]);
        $actualite = Actualite::create($request->all());
        return response()->json($actualite, 201);
    }

    public function show($id)
    {
        return response()->json(Actualite::with('club')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $actualite = Actualite::findOrFail($id);
        $actualite->update($request->all());
        return response()->json($actualite);
    }

    public function destroy($id)
    {
        Actualite::findOrFail($id)->delete();
        return response()->json(['message' => 'Actualité supprimée']);
    }
}