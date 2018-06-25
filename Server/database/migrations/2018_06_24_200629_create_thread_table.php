<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateThreadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('threads', function(Blueprint $table){
            $table->increments('id');
            $table->string('subject', 50);
            $table->unsignedInteger('user_id_issuing');
            $table->unsignedInteger('user_id_receiver');
            $table->tinyInteger('status')->default(1);
            $table->timestamps();

            $table->foreign('user_id_issuing')->references('id')->on('users');
            $table->foreign('user_id_receiver')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('threads');
    }
}
