<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('education_history', function (Blueprint $table) {
            $table->id();
            $table->string('school');
            $table->string(column: 'degree');
            $table->string('course');
            $table->year('start_year');
            $table->year('end_year');
            $table->foreignId('applicant_id')->constrained('applicants')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education_history');
    }
};
