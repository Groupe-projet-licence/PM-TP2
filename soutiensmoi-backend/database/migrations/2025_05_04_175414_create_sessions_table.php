<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tutor_id')->constrained('users')->onDelete('cascade');
            $table->string('matiere');
            $table->date('date');
            $table->time('heure');
            $table->enum('mode', ['visio', 'présentiel']);
            $table->enum('status', ['en_attente', 'validée', 'annulée', 'terminée'])->default('en_attente');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('sessions');
    }
};
