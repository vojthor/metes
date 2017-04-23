<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCriterionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criterions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('criterion_group_id');
            $table->string('name', 100);
            $table->string('description', 1000)->nullable();
            $table->string('meaning', 1000)->nullable();
            $table->string('scale', 1000)->nullable();//oddeleno strednikem
            $table->double('weight')->nullable();
            $table->smallinteger('status');
            $table->boolean('is_key');
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
        Schema::drop('criterions');
    }
}
