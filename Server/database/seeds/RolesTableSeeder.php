<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = new Role();
        $role->fill(['description' => 'Administrador']);
        $role->save();

        $role = new Role();
        $role->fill(['description' => 'Padrino']);
        $role->save();

        $role = new Role();
        $role->fill(['description' => 'Ahijado']);
        $role->save();
    }
}
