<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'site',
        'equipment',
        'variable',
        'timestamp',
        'author',
        'message'
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];
}