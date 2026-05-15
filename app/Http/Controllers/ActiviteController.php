<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    public function index()
    {
        return response()->json(Activite::with('club')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'club_id' => 'required|exists:clubs,id',
        ]);
        $activite = Activite::create($request->all());
        return response()->json($activite, 201);
    }

    public function show($id)
    {
        return response()->json(Activite::with('club')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $activite = Activite::findOrFail($id);
        $activite->update($request->all());
        return response()->json($activite);
    }

    public function destroy($id)
    {
        Activite::findOrFail($id)->delete();
        return response()->json(['message' => 'Activité supprimée']);
    }
}
