<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'id', 'first_name', 'last_name', 'email', 'interests', 'password', 'photography_url',
    ];

    protected $hidden = [ 'remember_token' ];

    public function roles(){
        return $this->belongsToMany(Role::class, 'roles_user', 'user_id', 'role_id');
    }
}
