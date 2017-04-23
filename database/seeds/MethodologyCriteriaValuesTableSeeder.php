<?php

use Illuminate\Database\Seeder;

class MethodologyCriteriaValuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nahrani vyberovych kriterii
        //---------RUP-------------
        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '16',
            'methodology_id' => '1',
            'name' => 'Důležitost produktu',
            'min' => '2',
            'max' => '5',
            'opt' => '5',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '17',
            'methodology_id' => '1',
            'name' => 'Délka projektu',
            'min' => '2',
            'max' => '5',
            'opt' => '4',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '18',
            'methodology_id' => '1',
            'name' => 'Stálost požadavků',
            'min' => '2',
            'max' => '5',
            'opt' => '2',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '19',
            'methodology_id' => '1',
            'name' => 'Znovupoužitelnost',
            'min' => '0',
            'max' => '4',
            'opt' => '3',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '20',
            'methodology_id' => '1',
            'name' => 'Velikost řešení',
            'min' => '2',
            'max' => '5',
            'opt' => '5',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '21',
            'methodology_id' => '1',
            'name' => 'Zkušenost manažera projektu',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '22',
            'methodology_id' => '1',
            'name' => 'Kvalifikace členů týmu',
            'min' => '0',
            'max' => '5',
            'opt' => '5',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '23',
            'methodology_id' => '1',
            'name' => 'Motivace členů týmu',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '24',
            'methodology_id' => '1',
            'name' => 'Dostupnost uživatelů',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '25',
            'methodology_id' => '1',
            'name' => 'Velikost týmu',
            'min' => '2',
            'max' => '5',
            'opt' => '5',
            'note' => 'RUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '26',
            'methodology_id' => '1',
            'name' => 'Rozmístění',
            'min' => '0',
            'max' => '5',
            'opt' => '5',
            'note' => 'RUP kritério',
        ]);

//-----------OpenUP-----------------------
        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '16',
            'methodology_id' => '2',
            'name' => 'Důležitost produktu',
            'min' => '0',
            'max' => '2',
            'opt' => '2',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '17',
            'methodology_id' => '2',
            'name' => 'Délka projektu',
            'min' => '0',
            'max' => '4',
            'opt' => '2',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '18',
            'methodology_id' => '2',
            'name' => 'Stálost požadavků',
            'min' => '1',
            'max' => '5',
            'opt' => '1',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '19',
            'methodology_id' => '2',
            'name' => 'Znovupoužitelnost',
            'min' => '0',
            'max' => '3',
            'opt' => '2',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '20',
            'methodology_id' => '2',
            'name' => 'Velikost řešení',
            'min' => '0',
            'max' => '3',
            'opt' => '2',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '21',
            'methodology_id' => '2',
            'name' => 'Zkušenost manažera projektu',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '22',
            'methodology_id' => '2',
            'name' => 'Kvalifikace členů týmu',
            'min' => '0',
            'max' => '5',
            'opt' => '5',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '23',
            'methodology_id' => '2',
            'name' => 'Motivace členů týmu',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '24',
            'methodology_id' => '2',
            'name' => 'Dostupnost uživatelů',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '25',
            'methodology_id' => '2',
            'name' => 'Velikost týmu',
            'min' => '0',
            'max' => '2',
            'opt' => '2',
            'note' => 'OpenUP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '26',
            'methodology_id' => '2',
            'name' => 'Rozmístění',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'OpenUP kritério',
        ]);

//------------SCRUM----------------------

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '16',
            'methodology_id' => '3',
            'name' => 'Důležitost produktu',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '17',
            'methodology_id' => '3',
            'name' => 'Délka projektu',
            'min' => '1',
            'max' => '5',
            'opt' => '3',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '18',
            'methodology_id' => '3',
            'name' => 'Stálost požadavků',
            'min' => '0',
            'max' => '3',
            'opt' => '0',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '19',
            'methodology_id' => '3',
            'name' => 'Znovupoužitelnost',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '20',
            'methodology_id' => '3',
            'name' => 'Velikost řešení',
            'min' => '0',
            'max' => '5',
            'opt' => '5',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '21',
            'methodology_id' => '3',
            'name' => 'Zkušenost manažera projektu',
            'min' => '0',
            'max' => '2',
            'opt' => '2',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '22',
            'methodology_id' => '3',
            'name' => 'Kvalifikace členů týmu',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '23',
            'methodology_id' => '3',
            'name' => 'Motivace členů týmu',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '24',
            'methodology_id' => '3',
            'name' => 'Dostupnost uživatelů',
            'min' => '0',
            'max' => '1',
            'opt' => '0',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '25',
            'methodology_id' => '3',
            'name' => 'Velikost týmu',
            'min' => '1',
            'max' => '4',
            'opt' => '3',
            'note' => 'SCRUM kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '26',
            'methodology_id' => '3',
            'name' => 'Rozmístění',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'SCRUM kritério',
        ]);

//------------XP----------------------

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '16',
            'methodology_id' => '4',
            'name' => 'Důležitost produktu',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '17',
            'methodology_id' => '4',
            'name' => 'Délka projektu',
            'min' => '0',
            'max' => '4',
            'opt' => '2',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '18',
            'methodology_id' => '4',
            'name' => 'Stálost požadavků',
            'min' => '0',
            'max' => '3',
            'opt' => '0',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '19',
            'methodology_id' => '4',
            'name' => 'Znovupoužitelnost',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '20',
            'methodology_id' => '4',
            'name' => 'Velikost řešení',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '21',
            'methodology_id' => '4',
            'name' => 'Zkušenost manažera projektu',
            'min' => '0',
            'max' => '2',
            'opt' => '2',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '22',
            'methodology_id' => '4',
            'name' => 'Kvalifikace členů týmu',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '23',
            'methodology_id' => '4',
            'name' => 'Motivace členů týmu',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '24',
            'methodology_id' => '4',
            'name' => 'Dostupnost uživatelů',
            'min' => '0',
            'max' => '1',
            'opt' => '0',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '25',
            'methodology_id' => '4',
            'name' => 'Velikost týmu',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'XP kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '26',
            'methodology_id' => '4',
            'name' => 'Rozmístění',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'XP kritério',
        ]);

//-------------MSF CMMI---------------------

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '16',
            'methodology_id' => '5',
            'name' => 'Důležitost produktu',
            'min' => '2',
            'max' => '5',
            'opt' => '5',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '17',
            'methodology_id' => '5',
            'name' => 'Délka projektu',
            'min' => '2',
            'max' => '5',
            'opt' => '4',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '18',
            'methodology_id' => '5',
            'name' => 'Stálost požadavků',
            'min' => '2',
            'max' => '5',
            'opt' => '3',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '19',
            'methodology_id' => '5',
            'name' => 'Znovupoužitelnost',
            'min' => '0',
            'max' => '4',
            'opt' => '3',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '20',
            'methodology_id' => '5',
            'name' => 'Velikost řešení',
            'min' => '2',
            'max' => '5',
            'opt' => '5',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '21',
            'methodology_id' => '5',
            'name' => 'Zkušenost manažera projektu',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '22',
            'methodology_id' => '5',
            'name' => 'Kvalifikace členů týmu',
            'min' => '0',
            'max' => '5',
            'opt' => '5',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '23',
            'methodology_id' => '5',
            'name' => 'Motivace členů týmu',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '24',
            'methodology_id' => '5',
            'name' => 'Dostupnost uživatelů',
            'min' => '0',
            'max' => '4',
            'opt' => '4',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '25',
            'methodology_id' => '5',
            'name' => 'Velikost týmu',
            'min' => '1',
            'max' => '5',
            'opt' => '5',
            'note' => 'MSF CMMI kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '26',
            'methodology_id' => '5',
            'name' => 'Rozmístění',
            'min' => '0',
            'max' => '5',
            'opt' => '5',
            'note' => 'MSF CMMI kritério',
        ]);
        //--------FDD---------------------------

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '16',
            'methodology_id' => '6',
            'name' => 'Důležitost produktu',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '17',
            'methodology_id' => '6',
            'name' => 'Délka projektu',
            'min' => '0',
            'max' => '4',
            'opt' => '2',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '18',
            'methodology_id' => '6',
            'name' => 'Stálost požadavků',
            'min' => '1',
            'max' => '3',
            'opt' => '1',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '19',
            'methodology_id' => '6',
            'name' => 'Znovupoužitelnost',
            'min' => '0',
            'max' => '2',
            'opt' => '2',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '20',
            'methodology_id' => '6',
            'name' => 'Velikost řešení',
            'min' => '0',
            'max' => '4',
            'opt' => '5',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '21',
            'methodology_id' => '6',
            'name' => 'Zkušenost manažera projektu',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '22',
            'methodology_id' => '6',
            'name' => 'Kvalifikace členů týmu',
            'min' => '0',
            'max' => '3',
            'opt' => '3',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '23',
            'methodology_id' => '6',
            'name' => 'Motivace členů týmu',
            'min' => '0',
            'max' => '2',
            'opt' => '2',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '24',
            'methodology_id' => '6',
            'name' => 'Dostupnost uživatelů',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '25',
            'methodology_id' => '6',
            'name' => 'Velikost týmu',
            'min' => '0',
            'max' => '4',
            'opt' => '3',
            'note' => 'FDD kritério',
        ]);

        DB::table('methodology_criteria_values')->insert([
            'criterion_id' => '26',
            'methodology_id' => '6',
            'name' => 'Rozmístění',
            'min' => '0',
            'max' => '1',
            'opt' => '1',
            'note' => 'FDD kritério',
        ]);
    }
}
