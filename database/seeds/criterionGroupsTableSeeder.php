<?php

use Illuminate\Database\Seeder;

class criterionGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('criterions_groups')->insert([
            'name' => 'Proces',//id 1
            'type' => 'Doplňková',
        ]);

        DB::table('criterions_groups')->insert([
            'name' => 'Podpora',//id 2
            'type' => 'Doplňková',
        ]);

        DB::table('criterions_groups')->insert([
            'name' => 'Produkt',//id 3
            'type' => 'Klíčová',
        ]);

        DB::table('criterions_groups')->insert([
            'name' => 'Lidé',//id 4
            'type' => 'Klíčová',
        ]);

    }
}
