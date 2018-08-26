<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function store(EventRequest $request){
      try {
        $newInstance = Event::create([
          "title" => $request->input('title'),
          "description" => $request->input('description'),
          "created_by" => $request->input('created_by'),
        ]);

        return response()->json([
            'header' => 'Éxito',
            'status' => 'success',
            'messages' => ['Se ha registrado la noticia'],
            'data' => [
                'id' => $newInstance->id
            ]
        ]);

      } catch (Exception $e) {
        return response()->json(['header' => 'Error', 'status' => 'error', 'messages' =>
            ['Ocurrió un error en el registro'],
            ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
      }
    }
}
