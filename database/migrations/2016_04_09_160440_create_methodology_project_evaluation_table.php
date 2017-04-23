<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMethodologyProjectEvaluationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('methodology_project_evaluations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('methodology_id');
            $table->integer('project_evaluation_id');
            $table->string('type', 100)->nullable();//Použitelné metodiky - porovnání dle výběrových kritérií, Doporučené metodiky - dle hodnocení doplňkových kriterií
            $table->double('value')->nullable();//trida je treba zalozit drive nez se vkladaji tyto hodnoty
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('methodology_project_evaluations');
    }
}
