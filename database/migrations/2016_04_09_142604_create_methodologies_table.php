<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMethodologiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('methodologies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);// Information Technology International Library, Rational Unified Process
            $table->string('shortcut')->nullable();// ITIL, RUP
            $table->string('version', 100);//typicky v_01, V3,...
            $table->string('owner', 100)->nullable();//IBM
            $table->string('publisher', 100)->nullable();
            $table->string('licence', 1000)->nullable();//seznam licenci
            $table->string('certificate', 1000)->nullable();//seznam certifikatu
            $table->string('language', 50)->nullable();//english, czech
            $table->string('url', 200)->nullable();//url adresa metodiky, pokud existuje
            $table->string('description', 1000)->nullable();
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
        Schema::drop('methodologies');
    }
}
