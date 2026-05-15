<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('comptes', function (Blueprint $table) {
            $table->id();
            $table->string('role');
            $table->date('dateCreation')->nullable();
            $table->date('dateSuppression')->nullable();
            $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('comptes');
    }
};
