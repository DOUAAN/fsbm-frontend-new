<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        return response()->json(Club::with('responsable')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
        ]);
        $club = Club::create($request->all());
        return response()->json($club, 201);
    }

    public function show($id)
    {
        return response()->json(Club::with([
            'responsable',
            'actualites',
            'evenements',
            'activites',
            'programmes'
        ])->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);
        $club->update($request->all());
        return response()->json($club);
    }

    public function destroy($id)
    {
        Club::findOrFail($id)->delete();
        return response()->json(['message' => 'Club supprimé']);
    }
}