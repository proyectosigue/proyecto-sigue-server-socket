<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Hash;
use Exception;

use App\User;
use App\Role;

class GodfatherController extends Controller
{
    public function index()
    {
        $godfathers = User::whereHas('roles', function($q){
            return $q->where('description', 'Padrino');
        })->orderBy('id', 'asc')->get();
        return response()->json($godfathers);
    }
    
    public function show($user)
    {
        try {
            return response()->json(['user' => User::findOrFail($user)]);
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
            'password' => 'required',
            'email' => 'required|email',
            //'profile_image' => 'required',
        ], [
            'password.required' => 'La contraseña es obligatoria',
            'email.required' => 'El email es obligatorio',
            'email.email' => 'El email debe ser válido',
            'first_name.required' => 'Escriba su nombre por favor',
            'last_name.required' => 'Escriba su apellido por favor',
            // 'profile_image.required' => 'Su fotografía es obligatoria',
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

            $user = new User();
            $user->fill([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'interests' => $request->input('interests'),
                'password' => Hash::make($request->input('password')),
                'email' => $request->input('email'),
                'photography_url' => $photography_url
            ]);
            $user->save();

            $user->roles()->attach(Role::where('description', 'Padrino')->first()->id);

            return response()->json(['status' => 'Éxito', 'messages' => ['Se ha registrado al usuario como Padrino']]);
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
