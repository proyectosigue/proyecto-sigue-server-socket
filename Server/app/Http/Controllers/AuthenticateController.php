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
                return response()->json(["error" => "invalid_credentials"], 401);
            }
        }
        catch(JWTException $e){
            return response()->json(["error" => "could_not_create_token"], 500);
        }

        $response = compact(['token']);
        $response['user'] = Auth::user();

        return $response;
    }
}
