<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSongNameToMusicTable extends Migration
{
    public function up()
    {
        Schema::table('music', function (Blueprint $table) {
            $table->string('song_name')->nullable()->after('file_path');
        });
    }

    public function down()
    {
        Schema::table('music', function (Blueprint $table) {
            $table->dropColumn('song_name');
        });
    }
}
