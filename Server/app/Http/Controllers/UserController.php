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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required",
            "password" => "required",
            "email" => "required|email"
        ], [
            "username.required" => "El nombre de usuario es obligatorio",
            "password.required" => "La contraseña es obligatoria",
            "email.required" => "El email es obligatorio",
            "email.email" => "El email debe ser válido"
        ]);

        if($validator->fails()){
            return response()->json(["status" => "Error",
                "messages" => $this->formattedValidatorErrorsArray($validator)]);
        }

        try {
            $user = new User([
                'name' => $request->input("username"),
                'password' => Hash::make($request->input("password")),
                'email' => $request->input("email")
            ]);
            $user->save();
            return response()->json(['status' => "Éxito", "messages" => ["Te has registrado"]]);
        } catch (Exception $e) {
            return response()->json(['status' => "Error", "messages" => ["Ocurrió un error en el registro"]]);
        }
    }

    private function formattedValidatorErrorsArray($validator){
        foreach( $validator->errors()->toArray() as $error){
            $errors[] = $error;
        }
        return $errors;
    }

}