<?php

use App\Http\Controllers\Applicant\AddressController;
use App\Http\Controllers\Applicant\ApplicantInformationController;
use App\Http\Controllers\Applicant\EducationHistoryController;
use App\Http\Controllers\Applicant\FileController;
use App\Http\Controllers\Applicant\WorkExperienceController;
use App\Http\Controllers\Applicant\EmergencyContactController;
use App\Http\Controllers\Applicant\LanguageController;
use App\Http\Controllers\Application\ApplicationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\JobPosting\JobPostingController;
use App\Http\Controllers\Interview\InterviewFeedbackController;
use App\Http\Controllers\Interview\InterviewScheduleController;
use App\Http\Controllers\JobPosting\SavedJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// authentication routes (breeze)
Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store'])
        ->middleware('guest')
        ->name('register');
    Route::controller(AuthenticatedSessionController::class)->group(function () {
        Route::post('/login', 'store')->middleware('guest')->name('login');
        Route::post('/logout', 'destroy')->middleware(['auth:sanctum'])->name('logout');
        Route::post('/refresh-token', 'update');
    });
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->middleware('guest')
        ->name('password.email');
    Route::controller(NewPasswordController::class)->group(function () {
        Route::post('/reset-password', 'store')
            ->middleware('guest')
            ->name('password.store');
        Route::post('/change-password', 'changePassword')->middleware(['auth:sanctum']);
    });
    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['auth', 'signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware(['auth', 'throttle:6,1'])
        ->name('verification.send');
});

Route::middleware(['auth:sanctum'])->group(function () {
    // applicant details routes
    Route::apiResource('applicant', ApplicantInformationController::class);
    Route::apiResource('workexperience', WorkExperienceController::class);
    Route::apiResource('educationhistory', EducationHistoryController::class);
    Route::apiResource('address', AddressController::class);
    Route::apiResource('emergencycontact', EmergencyContactController::class);
    Route::apiResource('language', LanguageController::class);
    // application routes
    Route::controller(ApplicationController::class)->prefix('application')->group(function () {
        Route::get('/view-applications', 'index');
        Route::get('/{application}', 'view');
        Route::post('/{jobposting}', 'apply');
    });
    // file routes
    Route::controller(FileController::class)->prefix('applicant')->group(function () {
        Route::post('/profile', 'uploadProfile');
        Route::get('/file/{document}', 'getFile');
        Route::get('/default/file', 'getDefaultDocument');
        Route::prefix('/resume')->group(function () {
            Route::post('/', 'uploadResume');
            Route::delete('/{document}', 'deleteResume');
            Route::get('/{document}', 'downloadResume');
        });
        Route::prefix('/cover-letter')->group(function () {
            Route::post('/', action: 'uploadCoverLetter');
            Route::delete('/{document}', 'deleteCoverLetter');
            Route::get('/{document}', action: 'downloadCoverLetter');
        });
    });
    // jobposting
    Route::get('jobposting/open/saved', [JobPostingController::class, 'getOpenJobsWithSaved']);
    // saved job routes
    Route::controller(SavedJobController::class)->prefix('saved-job')->group(function () {
        Route::get('/', 'index');
        Route::post('/{jobposting}', 'store');
        Route::delete('/{savedjob}', 'destroy');
    });

    // HR
    Route::prefix('/hr')->group(function () {
        // application
        Route::put('/application/{application}', [ApplicationController::class, 'updateStatus']);
        // job posting
        Route::apiResource('jobposting', JobPostingController::class)->except(['index']);
        // interview
        Route::controller(InterviewScheduleController::class)->prefix('interview')->group(function () {
            Route::post('/schedule/{application}', 'scheduleInterview');
            Route::put('/schedule/{interview}', 'updateInterview');
            Route::apiResource('/{interview}/feedback', InterviewFeedbackController::class);
        });
    });
});

// public routes
Route::get('jobposting/open', [JobPostingController::class, 'getOpenJobs']);

