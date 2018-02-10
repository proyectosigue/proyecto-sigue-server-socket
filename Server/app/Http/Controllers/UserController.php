<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;
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

        foreach( $validator->errors()->toArray() as $error){
            $errors[] = $error;
        }

        if($validator->fails()){
            return response()->json(["status" => "Error", "messages" => $errors]);
        }

        try {
            $user = new User([
                'name' => $request->input("username"),
                'password' => $request->input("password"),
                'email' => $request->input("email")
            ]);
            $user->save();
            return response()->json(['status' => "Éxito",
                "messages" => "El usuario fue añadido correctamente"]);
        } catch (Exception $e) {
            return response()->json(['status' => "Éxito",
                "messages" => "Ocurrio un error al añadir el usuario"]);
        }
    }

}