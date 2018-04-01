<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'id', 'first_name', 'last_name', 'email', 'interests', 'password', 'profile_image', 'status'
    ];

    protected $hidden = [ 'remember_token' ];

    public function roles(){
        return $this->belongsToMany(Role::class, 'roles_user', 'user_id', 'role_id');
    }

    public function godsons(){
        return $this->hasMany(Godson::class, 'godfather_id','id');
    }

    public function scopeGodfathers($query){
        return $query->whereHas('roles', function($q){
            return $q->where('description', 'Padrino');
        })->where('status', 1)->orderBy('id', 'asc');
    }

}
