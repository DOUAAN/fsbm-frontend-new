<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Actualite extends Model
{
    protected $fillable = [
        'titre',
        'contenu',
        'image',
        'categorie',
        'club_id',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
