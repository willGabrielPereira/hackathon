<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('superior_id')->nullable()->after('remember_token');
            $table->foreign('superior_id')->on('users')->references('id');
        });
    }
};
