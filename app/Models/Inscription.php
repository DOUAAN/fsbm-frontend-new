<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $fillable = [
        'filiere',
        'statut',
        'dateInscription',
        'utilisateur_id',
        'evenement_id',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }
}
