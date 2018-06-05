<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Godson extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'age',
        'profile_image',
        'orphan_house_id',
        'status'
    ];

    protected $appends = [
        'full_name'
    ];

    public function godfathers(){
        return $this->belongsToMany(User::class)->withTimestamps()
            ->whereHas('roles', function($q){
                return $q->where('description', 'Padrino');
        });
    }

    public function getFullNameAttribute(){
        return $this->first_name.' '.$this->last_name;
    }

}
