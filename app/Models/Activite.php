<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    protected $fillable = [
        'titre',
        'description',
        'type',
        'bilan',
        'date',
        'club_id',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function medias()
    {
        return $this->hasMany(Media::class);
    }
}
