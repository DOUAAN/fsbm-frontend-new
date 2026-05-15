<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    protected $fillable = [
        'nom',
        'description',
        'domaine',
        'logo',
        'statut',
        'anneeCreation',
        'responsable_id',
    ];

    public function responsable()
    {
        return $this->belongsTo(Utilisateur::class, 'responsable_id');
    }

    public function actualites()
    {
        return $this->hasMany(Actualite::class);
    }

    public function evenements()
    {
        return $this->hasMany(Evenement::class);
    }

    public function activites()
    {
        return $this->hasMany(Activite::class);
    }

    public function programmes()
    {
        return $this->hasMany(ProgrammeAnnuel::class);
    }
}