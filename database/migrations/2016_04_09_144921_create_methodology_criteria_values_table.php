<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMethodologyCriteriaValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('methodology_criteria_values', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('criterion_id');
            $table->integer('methodology_id');
            $table->string('name', 100)->nullable();
            $table->smallInteger('opt');
            $table->smallInteger('min');
            $table->smallInteger('max');
            $table->string('note', 1000)->nullable();
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
        Schema::drop('methodology_criteria_values');
    }
}
