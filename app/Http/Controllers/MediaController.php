<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index()
    {
        return response()->json(Media::with('activite')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomFichier' => 'required|string',
            'activite_id' => 'required|exists:activites,id',
        ]);
        $media = Media::create($request->all());
        return response()->json($media, 201);
    }

    public function show($id)
    {
        return response()->json(Media::with('activite')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $media = Media::findOrFail($id);
        $media->update($request->all());
        return response()->json($media);
    }

    public function destroy($id)
    {
        Media::findOrFail($id)->delete();
        return response()->json(['message' => 'Média supprimé']);
    }
}