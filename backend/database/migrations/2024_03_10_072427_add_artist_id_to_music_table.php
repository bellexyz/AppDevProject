<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddArtistIdToMusicTable extends Migration
{
    public function up()
    {
        Schema::table('music', function (Blueprint $table) {
            $table->unsignedBigInteger('artist_id')->nullable(); // Define the artist_id column
            $table->foreign('artist_id')->references('id')->on('users')->onDelete('cascade'); // Define foreign key constraint
        });
    }

    public function down()
    {
        Schema::table('music', function (Blueprint $table) {
            $table->dropForeign(['artist_id']); // Drop foreign key constraint
            $table->dropColumn('artist_id'); // Drop artist_id column
        });
    }
}
