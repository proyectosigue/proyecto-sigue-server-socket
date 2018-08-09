<?php

namespace App\Http\Controllers;

use App\User;
use App\Thread;
use App\Message;
use Illuminate\Http\Request;
use App\Http\Traits\APIResponse;

class MessageController extends Controller
{

    public function store(Request $request, Thread $thread, User $user){
        try {

            $message = new Message();
            $message->body = $request->body;
            $message->thread()->associate($thread);
            $message->replier()->associate($user);
            $message->save();

            return response()->json(APIResponse::success('Mensaje enviado'));

        } catch(\Exception $e){

            $errors = ['Ocurrió un error en el registro'];
            $debug_message = $e->getMessage() . ' on line ' . $e->getLine();

            return response()->json(APIResponse::error($errors, $debug_message));
        }
    }

    public function destroy(Request $request, Message $message){
        try {

            $message->status = 0;
            $message->save();

            return response()->json([
                'header' => 'Éxito',
                'status' => 'success',
                'messages' => ['Mensaje desactivado'],
            ]);

        }catch(\Exception $e){
            return response()->json(['header' => 'Error', 'status' => 'error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

}
