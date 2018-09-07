<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
      "title",
      "description",
      "image",
      "created_by",
    ];

    public function created_by()
    {
      return $this->belongsTo('App\User', 'created_by');
    }

    public function getImageAttribute($value)
    {
        return asset("storage")."/$value";
    }
}
