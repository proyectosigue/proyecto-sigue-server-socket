<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;

use Hash;
use Exception;

use App\Http\Middleware\Cors;
use App\User;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all()->toArray();
        return response()->json($users);
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
            return response()->json(['status' => 'Éxito', 'messages' => ['Te has registrado']]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage()]]);
        }
    }

    public function destroy($user)
    {
        try {
            User::findOrFail($user)->delete();
            return response()->json(['user' => 'Usuario borrado con éxito']);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al borrar'],
                ['debug' => $e->getMessage()]]);
        }
    }

    public function getGodfathers(Request $request)
    {
        $users = User::all()->toArray();
        return response()->json(['status' => 'Éxito', 'messages' => ['padrinos'], 'data' => $users]);
    }

    private function formattedValidatorErrorsArray($validator)
    {
        foreach ($validator->errors()->toArray() as $error) {
            $errors[] = $error;
        }
        return $errors;
    }

}