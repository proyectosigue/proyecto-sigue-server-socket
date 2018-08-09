<?php

namespace App\Http\Controllers;

use App\User;
use App\Thread;
use Illuminate\Http\Request;
use App\Http\Traits\APIResponse;
use Illuminate\Support\Facades\Auth;

class ThreadController extends Controller
{

    public function show(Thread $thread){
        return response()->json($thread->messages->toArray());
    }

    // TODO Se debería de poder inyectar User $receiver_user pero lo recibe como nulo
    public function store(Request $request, $receiver_user)
    {
        try {

            $thread = new Thread();
            $thread->subject = $request->subject;
            $thread->issuing()->associate(Auth::user()->id);
            $thread->receiver()->associate($receiver_user);
            $thread->save();

            $api_response = APIResponse::success('Se ha creado el tema');

            $api_response['thread'] = $thread;
            return response()->json($api_response);

        } catch (\Exception $e) {

            $errors = ['Ocurrió un error'];
            $debug_message = $e->getMessage() . ' on line ' . $e->getLine() .
                ' file ' . $e->getFile();

            $api_response = APIResponse::error($errors, $debug_message);

            return response()->json($api_response);
        }

    }

    public function update(Request $request, Thread $thread)
    {
        try {

            $thread->subject = $request->subject;
            $thread->save();

        } catch (\Exception $e) {
            return response()->json(['header' => 'Error', 'status' => 'error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }

        return response()->json([
            'header' => 'Éxito',
            'status' => 'success',
            'messages' => ['Se ha actualizado el tema'],
        ]);
    }

    public function destroy(Request $request, Thread $thread)
    {
        try {

            $thread->status = 0;
            $thread->save();


            return response()->json([
                'header' => 'Éxito',
                'status' => 'success',
                'messages' => ['Tema desactivado'],
            ]);

        } catch (\Exception $e) {
            return response()->json(['header' => 'Error', 'status' => 'error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function destroyAll(Request $request, User $user)
    {
        try {

            $user->issuingThreads()->update(['status' => 0]);
            $user->receiverThreads()->update(['status' => 0]);


            return response()->json([
                'header' => 'Éxito',
                'status' => 'success',
                'messages' => ['Todos los temas han sido desactivados'],
            ]);

        } catch (\Exception $e) {
            return response()->json(['header' => 'Error', 'status' => 'error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function userThreads(Request $request, User $user)
    {
        $threads = Thread::active()->where(function ($q) use ($user) {
            return $q->where('user_id_issuing', $user->id)->orWhere('user_id_receiver', $user->id);
        })->with(['messages' => function($q){
            return $q->orderBy('id', 'desc')->first();
        }])->get();

        return response()->json($threads);
    }

    public function receiverThreads(Request $request, User $user)
    {
        return response()->json($user->receiverThreads()->with('messages')->get());
    }

    public function issuingThreads(Request $request, User $user)
    {
        return response()->json($user->issuingThreads()->active()->with('messages')->get());
    }

    public function threadMessages(Request $request, Thread $thread)
    {
        return response()->json($thread->with('messages')->get());
    }
}
