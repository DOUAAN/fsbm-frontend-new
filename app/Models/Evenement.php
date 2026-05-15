<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    protected $fillable = [
        'titre',
        'contenu',
        'image',
        'date',
        'lieu',
        'heure',
        'affiche',
        'club_id',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }
}
