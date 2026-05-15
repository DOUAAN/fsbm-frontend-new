<?php

namespace App\Http\Controllers;

use App\Models\ProgrammeAnnuel;
use Illuminate\Http\Request;

class ProgrammeAnnuelController extends Controller
{
    public function index()
    {
        return response()->json(ProgrammeAnnuel::with('club')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'annee' => 'required|integer',
            'club_id' => 'required|exists:clubs,id',
        ]);
        $programme = ProgrammeAnnuel::create($request->all());
        return response()->json($programme, 201);
    }

    public function show($id)
    {
        return response()->json(ProgrammeAnnuel::with('club')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $programme = ProgrammeAnnuel::findOrFail($id);
        $programme->update($request->all());
        return response()->json($programme);
    }

    public function destroy($id)
    {
        ProgrammeAnnuel::findOrFail($id)->delete();
        return response()->json(['message' => 'Programme supprimé']);
    }
}
