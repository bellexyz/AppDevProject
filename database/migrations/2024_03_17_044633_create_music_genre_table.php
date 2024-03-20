<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('music_genre', function (Blueprint $table) {
            $table->foreignId('genre_id')->constrained()->onDelete('cascade');
            $table->foreignId('music_id')->constrained()->onDelete('cascade');
            $table->primary(['genre_id', 'music_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_genre');
    }
};
