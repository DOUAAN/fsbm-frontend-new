<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgrammeAnnuel extends Model
{
    protected $fillable = [
        'titre',
        'annee',
        'description',
        'club_id',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
