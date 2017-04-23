<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCriterionEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criterion_evaluations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('criterion_id');
            $table->integer('methodology_project_evaluation_id');
            $table->double('criterion_evaluation');//dokud nekdo nerekne k cemu to je, bude prazdne
            $table->double('behind_extremes');
            $table->double('distance_from_optimum');
            $table->double('distance_absolute_values');
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
        Schema::drop('criterion_evaluations');
    }
}
