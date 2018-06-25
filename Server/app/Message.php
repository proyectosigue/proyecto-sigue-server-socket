<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'body',
        'thread_id',
        'user_id_replier',
        'status'
    ];

    public function thread(){
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    public function replier(){
        return $this->belongsTo(User::class, 'user_id_replier');
    }

    public function scopeActive($query){
        return $query->where('status', 1);
    }

    public function scopeInactive($query){
        return $query->where('status', 0);
    }

}
