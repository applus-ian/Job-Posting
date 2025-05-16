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
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->json('description');
            $table->integer('vacancies');
            $table->enum('salary_type', ['monthly', 'hourly', 'weekly', 'annually'])->default('monthly');
            $table->decimal('salary_min', 12, 2)->nullable();
            $table->decimal('salary_max', 12, 2)->nullable();
            $table->string('employment_type');
            $table->string('employment_level');
            $table->string('work_setup');
            $table->enum('status', ['open', 'closed', 'draft']);
            $table->foreignId('address_id')
                ->nullable()
                ->constrained('addresses')
                ->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
