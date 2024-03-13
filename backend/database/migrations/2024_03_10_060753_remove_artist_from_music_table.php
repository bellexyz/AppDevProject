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
        Schema::table('music', function (Blueprint $table) {
            $table->dropColumn('artist');
        });
    }
    
    public function down()
    {
        Schema::table('music', function (Blueprint $table) {
            $table->string('artist')->nullable();
        });
    }
    
};
