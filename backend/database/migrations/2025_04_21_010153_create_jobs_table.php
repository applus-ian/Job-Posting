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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('job_role');
            $table->string('category');
            $table->text('description');
            $table->text('requirements');
            $table->integer('vacancies');
            $table->decimal('salary_min', 12, 2);
            $table->decimal('salary_max', 12, 2);
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
        Schema::dropIfExists('jobs');
    }
};
