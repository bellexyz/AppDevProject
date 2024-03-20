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
    Schema::create('music', function (Blueprint $table) {
        $table->id();
        $table->foreignId('album_id')->constrained()->onDelete('cascade');
        $table->string('title');
        $table->string('file_path');
        $table->string('cover_path');
        $table->text('description')->nullable();
        // Add other relevant song information columns here
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music');
    }
};
