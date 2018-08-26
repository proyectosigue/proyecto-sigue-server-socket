<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('events', function(Blueprint $table){
         $table->increments('id');
         $table->string('title');
         $table->text('description');
         $table->string('image')->nullable();
         $table->integer('created_by')->unsigned();
         $table->foreign('created_by')->references('id')->on('users');
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
      Schema::drop('events');
    }
}
