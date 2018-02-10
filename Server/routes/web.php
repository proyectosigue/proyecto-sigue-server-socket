<?php

use App\Http\Requests;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function(){
    return view("welcome");
});
Route::post("login", "AuthenticateController@authenticate")->name("login");
Route::post("users", "UserController@store");
Route::middleware(["jwt.auth"])->group(function(){
    Route::resource('users', 'UserController', [
        'only' => [ 'index', 'show', 'update', 'destroy'],
    ]);
});