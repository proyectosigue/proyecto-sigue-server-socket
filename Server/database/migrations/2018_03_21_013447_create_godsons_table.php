<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGodsonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('godsons', function(Blueprint $table){
           $table->increments('id');
           $table->string('first_name');
           $table->string('last_name');
           $table->integer('age');
           $table->integer('orphan_house_id');
           $table->string('profile_image')->nullable();
           $table->tinyInteger('godfather_id');
           $table->tinyInteger('status')->default(1);
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
        Schema::drop('godsons');
    }
}
