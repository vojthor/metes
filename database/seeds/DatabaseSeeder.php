<?php

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(criterionsTableSeeder::class);
        $this->call(criterionGroupsTableSeeder::class);
        $this->call(MethodologiesTableSeeder::class);
        $this->call(MethodologyCriteriaValuesTableSeeder::class);
        $this->call(ProjectsTableSeeder::class);
        $this->call(ProjectCriteriaValuesTableSeeder::class);
        $this->call(UserTableSeeder::class);

//
//        $owner = new Role();
//        $owner->name         = 'user';
//        $owner->display_name = 'User'; // optional
//        $owner->description  = 'User is just a user'; // optional
//        $owner->save();
//
//        $admin = new Role();
//        $admin->name         = 'admin';
//        $admin->display_name = 'Administrator'; // optional
//        $admin->description  = 'User almighty admin.'; // optional
//        $admin->save();
//
//        $admin = new Role();
//        $admin->name         = 'methodology_curator';
//        $admin->display_name = 'Methodology Curator'; // optional
//        $admin->description  = 'User take care of methodologies'; // optional
//        $admin->save();

//        $listProjects = new Permission();
//        $listProjects->name         = 'list-projects';
//        $listProjects->display_name = 'List projects'; // optional
//        // Allow a user to...
//        $listProjects->description  = 'list all projects'; // optional
//        $listProjects->save();
//
//
//        $admin->attachPermission($listProjects);

    }
}
