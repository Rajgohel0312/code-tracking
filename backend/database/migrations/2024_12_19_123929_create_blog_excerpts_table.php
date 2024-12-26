<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogExcerptsTableModify extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_excerpts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_id')->constrained('blogs')->onDelete('cascade');
            $table->json('excerpt');
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
        Schema::dropIfExists('blog_excerpts');
    }
}
