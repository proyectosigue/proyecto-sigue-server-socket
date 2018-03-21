<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Exception;

use App\Godson;

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
            return response()->json(['godson' => $godson->get()]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al obtener'],
                ['debug' => $e->getMessage()]]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'orphan_house_id' => 'required',
            'godfather_id' => 'required',
            'age' => 'required'
        ], [
            'first_name.required' => 'Escriba el nombre del ahijado',
            'last_name.required' => 'Escriba el apellido',
            'orphan_house_id.required' => 'Especifique una casa hogar',
            'godfather_id.required' => 'Especifique un padrino',
            'age' => 'Especifique la edad del ahijado'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'Error',
                'messages' => $this->formattedValidatorErrorsArray($validator)]);
        }

        try {
            if(isset($request->profile_image)) {
                $photoName = time() . '.' . $request->profile_image->getClientOriginalExtension();
                $request->profile_image->move(storage_path('app/public/profile_images'), $photoName);
                $photography_url = storage_path('app/public/profile_images') . '/' . $photoName;
            }
            else {
                $photography_url = "";
            }

            $godson = new Godson();
            $godson->fill([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'profile_image' => $photography_url,
                'age' => $request->input('age'),
                'godfather_id' => $request->input('godfather_id'),
                'orphan_house_id' => $request->input('orphan_house_id')
            ]);
            $godson->save();

            return response()->json(['status' => 'Éxito', 'messages' => ['Se ha registrado al usuario como Ahijado']]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage()]]);
        }
    }

    private function formattedValidatorErrorsArray($validator)
    {
        foreach ($validator->errors()->toArray() as $error) {
            $errors[] = $error;
        }
        return $errors;
    }
}
