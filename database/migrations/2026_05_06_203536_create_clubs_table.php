<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description')->nullable();
            $table->string('domaine')->nullable();
            $table->string('logo')->nullable();
            $table->enum('statut', ['actif', 'inactif'])->default('actif');
            $table->integer('anneeCreation')->nullable();
            $table->foreignId('responsable_id')->nullable()->constrained('utilisateurs')->nullOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('clubs');
    }
};
