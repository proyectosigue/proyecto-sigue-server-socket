<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = array(
            [   'first_name' => 'Daniela',
                'last_name' => 'Sánchez',
                'email' => 'coordinacion@proyectosigue.com.mx',
                'interests' => 'Proyecto Sigue',
                'profile_image' => '',
                'password' => Hash::make('123456')]
        );
        foreach($users as $user){
            User::create($user);
        }
    }
}
