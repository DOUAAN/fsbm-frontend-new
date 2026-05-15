<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('contenu')->nullable();
            $table->string('image')->nullable();
            $table->date('date')->nullable();
            $table->string('lieu')->nullable();
            $table->string('heure')->nullable();
            $table->string('affiche')->nullable();
            $table->foreignId('club_id')->constrained('clubs')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('evenements');
    }
};
