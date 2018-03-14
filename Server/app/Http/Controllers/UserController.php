<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Hash;
use Exception;

use App\User;
use App\Role;

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

}