<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    public function index()
    {
        return response()->json(Evenement::with('club')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'club_id' => 'required|exists:clubs,id',
        ]);
        $evenement = Evenement::create($request->all());
        return response()->json($evenement, 201);
    }

    public function show($id)
    {
        return response()->json(Evenement::with('club')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $evenement = Evenement::findOrFail($id);
        $evenement->update($request->all());
        return response()->json($evenement);
    }

    public function destroy($id)
    {
        Evenement::findOrFail($id)->delete();
        return response()->json(['message' => 'Événement supprimé']);
    }
}