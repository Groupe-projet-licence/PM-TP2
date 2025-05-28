<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');

            $table->float('note')->default(0);
            $table->json('skills')->nullable();
            $table->integer('level')->default(2);
            $table->binary('image')->nullable();
            $table->string('image_mime')->nullable();


            $table->enum('role', ['etudiant', 'tuteur', 'admin'])->default('etudiant');
            $table->string('avatar')->nullable();
            $table->text('bio')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('users');
    }
};
