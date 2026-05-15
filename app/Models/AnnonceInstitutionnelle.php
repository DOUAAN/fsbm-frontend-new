<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnonceInstitutionnelle extends Model
{
    protected $table = 'annonces_institutionnelles';

    protected $fillable = [
        'titre',
        'contenu',
        'datePublication',
        'utilisateur_id',
    ];

    public function auteur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }
}
