<?php

namespace App\Http\Controllers;

use App\User;
use Exception;
use App\Godson;
use App\Http\Requests\GodsonRequest;

class GodsonController extends Controller
{
    public function index()
    {
        $godsons = Godson::orderBy('id', 'asc')->where('status', 1)->get();
        return response()->json($godsons);
    }

    public function show(Godson $godson)
    {
        try {
            return response()->json(['godson' => $godson]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al obtener'],
                ['debug' => $e->getMessage()]]);
        }
    }

    public function store(GodsonRequest $request)
    {
        try {
            if(isset($request->profile_image)) {
                $photoName = time() . '.' . $request->profile_image->getClientOriginalExtension();
                $request->profile_image->move(storage_path('app/public/profile_images'), $photoName);
                $photography_url = storage_path('app/public/profile_images') . '/' . $photoName;
            }
            else {
                $photography_url = "";
            }

            $godson = Godson::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'profile_image' => $photography_url,
                'age' => $request->input('age'),
                'orphan_house_id' => $request->input('orphan_house_id')
            ]);
            $godson->godfathers()->toggle($request->input('godfather_id'));

            return response()->json(['status' => 'Éxito', 'messages' => ['Se ha registrado al usuario como Ahijado']]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage(). ' on line '.$e->getLine()]]);
        }
    }

    public function update(GodsonRequest $request, Godson $godson){

        try {
            if(isset($request->profile_image)) {
                $photoName = time() . '.' . $request->profile_image->getClientOriginalExtension();
                $request->profile_image->move(storage_path('app/public/profile_images'), $photoName);
                $photography_url = storage_path('app/public/profile_images') . '/' . $photoName;
            }
            else {
                $photography_url = "";
            }

            $godson->update([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'profile_image' => $photography_url,
                'age' => $request->input('age'),
                'orphan_house_id' => $request->input('orphan_house_id')
            ]);

            return response()->json(['status' => 'Éxito', 'messages' => ['Se ha actualizado la información del ahijado']]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al actualizar al ahijado'],
                ['debug' => $e->getMessage(). ' on line '.$e->getLine()]]);
        }
    }

    public function destroy(Godson $godson)
    {
        try {
            $godson->delete();
            return response()->json(['status' => 'Éxito', 'messages' => ['Se ha borrado el ahijado']]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al borrar'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function getGodfathers(Godson $godson){
        try {
            return response()->json(['status' => 'Éxito', 'data' => $godson->godfathers]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al borrar'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }
}
