<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class AuthenticateController extends Controller
{
    public function authenticate(Request $request){
        $credentials = $request->only("email", "password");
        try {
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json(["status" => "Error", "message" => "Credenciales Inválidas"]);
            }
        }
        catch(JWTException $e){
            return response()->json(["status" => "Error", "message" => "No se pudo obtener el token"]);
        }

        $user = Auth::user();
        $response = compact(['token']);
        $response['user'] = Auth::user();

        return $response;
    }
}
