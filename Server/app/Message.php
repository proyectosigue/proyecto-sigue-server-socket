<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'body',
        'thread_id',
        'user_id_replier',
        'status',
        'created_at',
        'updated_at'
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

    public function scopeDescendant($query){
        return $query->orderBy('id', 'desc');
    }

    public function getCreatedAtAttribute(){
        return Carbon::parse($this->attributes['created_at'])->format('d/m H:i:s');
    }

}
