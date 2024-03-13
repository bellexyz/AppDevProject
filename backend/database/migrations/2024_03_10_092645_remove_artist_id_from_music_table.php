<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('music', function (Blueprint $table) {
        // Drop the foreign key constraint first
        $table->dropForeign(['artist_id']);
        
        // Then drop the column
        $table->dropColumn('artist_id');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('music', function (Blueprint $table) {
            $table->unsignedBigInteger('artist_id');
        });
        
    }
};
