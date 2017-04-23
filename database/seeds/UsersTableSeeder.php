<?php

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use App\Models\Permission;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Základní Uživatel',
            'email' => 'zakladni@uzivatel.cz',
            'password' => bcrypt("uzivatel"),
        ]);

        DB::table('users')->insert([
            'name' => 'Správce Metodiky',
            'email' => 'spravce@metodiky.cz',
            'password' => bcrypt("spravce"),
        ]);

        DB::table('users')->insert([
            'name' => 'Administrátor Aplikace',
            'email' => 'administrator@aplikace.cz',
            'password' => bcrypt("admin"),
        ]);

        $user = new Role();
        $user->name         = 'user';
        $user->display_name = 'User'; // optional
        $user->description  = 'User is just a user'; // optional
        $user->save();

        $user = User::find(1);
        $user->attachRole($user);

        $curator = new Role();
        $curator->name         = 'methodology_curator';
        $curator->display_name = 'Methodology Curator'; // optional
        $curator->description  = 'User take care of methodologies'; // optional
        $curator->save();

        $user = User::find(2);
        $user->attachRole($curator);


        $admin = new Role();
        $admin->name         = 'admin';
        $admin->display_name = 'Administrator'; // optional
        $admin->description  = 'User almighty admin.'; // optional
        $admin->save();

        $user = User::find(3);
        $user->attachRole($admin);

        $listProjects = new Permission();
        $listProjects->name         = 'list-projects';
        $listProjects->display_name = 'List projects'; // optional
        $listProjects->description  = 'list all projects'; // optional
        $listProjects->save();


        $admin->attachPermission($listProjects);



    }
}
