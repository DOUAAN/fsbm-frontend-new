<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('programmes_annuels', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->integer('annee');
            $table->text('description')->nullable();
            $table->foreignId('club_id')->constrained('clubs')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('programmes_annuels');
    }
};
