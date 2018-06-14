<?php

namespace App\Http\Controllers;

use Hash;
use App\User;
use App\Role;
use Exception;
use App\Godson;
use Illuminate\Http\Request;
use App\Http\Requests\GodfatherRequest;
use Illuminate\Support\Facades\Storage;

class GodfatherController extends Controller
{
    public function index()
    {
        return response()->json(User::godfathers()->get());
    }

    public function show(User $user)
    {
        try {
            return response()->json(['user' => $user]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al obtener'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function store(GodfatherRequest $request)
    {
        if (count(User::where('email', $request->input('email'))->get()) > 0) {
            return response()->json(['status' => 'Error', 'messages' => ['El email ya está dado de alta']]);
        }

        try {

            $user = User::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'interests' => $request->input('interests'),
                'password' => Hash::make($request->input('password')),
                'email' => $request->input('email'),
                'profile_image' => ''
            ]);
            $user->roles()->attach(Role::where('description', 'Padrino')->first()->id);

            return response()->json([
                'header' => 'Éxito',
                'status' => 'success',
                'messages' => ['Se ha registrado al usuario como Padrino'],
                'data' => [
                    'id' => $user->id
                ]
            ]);

        } catch (Exception $e) {
            return response()->json(['header' => 'Error', 'status' => 'error', 'messages' =>
                ['Ocurrió un error en el registro'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function update(GodfatherRequest $request, $godfather)
    {

        if (count(User::where('email', $request->input('email'))->get()) > 0) {
            return response()->json(['status' => 'Error', 'messages' => ['El email ya está dado de alta']]);
        }

        try {

            $godfather->update([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'interests' => $request->input('interests'),
                'password' => Hash::make($request->input('password')),
                'email' => $request->input('email'),
                'profile_image' => '',
            ]);

            return response()->json(['status' => 'Éxito', 'messages' => ['Se ha actualizado la información del padrino']]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al actualizar'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->roles()->detach(Role::get());
            $user->delete();
            return response()->json(['status' => 'Éxito', 'messages' => ['Se ha borrado el padrino']]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al borrar'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function uploadProfileImage(Request $request, User $user)
    {
        try {
            if($user->profile_image !== null && $user->profile_image !== ""){
                Storage::delete($user->profile_image);
                $user->profile_image = "";
            }

            $file_date_title = date('H_i_s').'_profile_image.jpeg';
            $full_file_address = "profile-images/$file_date_title";
            Storage::put($full_file_address, base64_decode($request->profile_image['value']));

            $user->profile_image = $full_file_address;
            $user->save();

            return response()->json([
                'header' => 'Éxito',
                'status' => 'success',
                'messages' => ['Se ha colocado la foto de perfil']
            ]);
        } catch (Exception $e) {
            return response()->json([
                'header' => 'Error',
                'status' => 'error',
                'messages' => ['Ocurrió un error, contacte al soporte'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public function toggleGodson(User $user, Godson $godson)
    {
        try {

            $user->godsons()->toggle($godson->id);

            if ($user->godsons()->where('id', $godson->id)->first() != null) {
                return response()->json(['status' => 'Éxito', 'message' => 'El padrino ha comenzado a apadrinar al ahijado']);
            }

            return response()->json(['status' => 'Éxito', 'message' => 'El padrino ha dejado de apadrinar al ahijado']);

        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al borrar'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

    public
    function getGodsons(User $user)
    {
        try {
            return response()->json(['status' => 'Éxito', 'data' => $user->godsons]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'messages' =>
                ['Ocurrió un error al borrar'],
                ['debug' => $e->getMessage() . ' on line ' . $e->getLine()]]);
        }
    }

}
