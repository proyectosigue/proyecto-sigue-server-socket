<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

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
        try {
            $user = new User([
                'username' => $request->input("username"),
                'password' => $request->input("password")
            ]);
            $user->save();
            return response()->json(['status' => true, "El usuario fue añadido correctamente", 200]);
        } catch (Exception $e) {
            return response("Ocurrio un error al añadir el usuario");
        }
    }

}