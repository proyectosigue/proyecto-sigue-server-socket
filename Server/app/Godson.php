<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Godson extends Model
{
    protected $fillable = ['first_name','last_name','age','profile_image','orphan_house_id','godfather_id','status'];

    public function godfather(){
        return $this->belongsTo(Godfather::class);
    }

}
