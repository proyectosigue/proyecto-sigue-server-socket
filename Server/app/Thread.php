<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    protected $fillable = [
        'subject',
        'user_id_issuing',
        'user_id_receiver',
        'status'
    ];

    public function issuing(){
        return $this->belongsTo(User::class, 'user_id_issuing');
    }

    public function receiver(){
        return $this->belongsTo(User::class, 'user_id_receiver');
    }

    public function messages(){
        return $this->hasMany(Message::class, 'thread_id', 'id');
    }

    public function scopeActive($query){
        return $query->where('status', 1);
    }

    public function scopeInactive($query){
        return $query->where('status', 0);
    }

    public function scopeDescendant($query){
        return $query->orderBy('id', 'desc');
    }


}
