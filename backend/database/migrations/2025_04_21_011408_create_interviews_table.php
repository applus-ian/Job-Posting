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
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->date('schedule_date');
            $table->time('schedule_time');
            $table->enum('mode', ['in_person', 'virtual']);
            $table->string('meeting_link')->nullable();
            $table->string('platform')->nullable();
            $table->string('location')->nullable();
            $table->enum('status', ['upcoming', 'completed', 'rescheduled', 'no-show', 'cancelled'])->default('upcoming');
            $table->foreignId('application_id')->constrained('applications')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
