<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    public function index()
    {
        return response()->json(Inscription::with(['utilisateur', 'evenement'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'filiere' => 'required|string',
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'evenement_id' => 'required|exists:evenements,id',
        ]);
        $inscription = Inscription::create($request->all());
        return response()->json($inscription, 201);
    }

    public function show($id)
    {
        return response()->json(Inscription::with(['utilisateur', 'evenement'])->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $inscription = Inscription::findOrFail($id);
        $inscription->update($request->all());
        return response()->json($inscription);
    }

    public function destroy($id)
    {
        Inscription::findOrFail($id)->delete();
        return response()->json(['message' => 'Inscription supprimée']);
    }
}