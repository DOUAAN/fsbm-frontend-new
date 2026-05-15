<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'nomFichier',
        'type',
        'dateAjout',
        'activite_id',
    ];

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }
}
