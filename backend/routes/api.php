<?php

use App\Http\Controllers\Applicant\ApplicantInformationController;
use App\Http\Controllers\Applicant\EducationHistoryController;
use App\Http\Controllers\Applicant\FileController;
use App\Http\Controllers\Applicant\WorkExperienceController;
use App\Http\Controllers\Applicant\EmergencyContactController;
use App\Http\Controllers\Applicant\LanguageController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Hr\CreateJobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\hr\JobPostingController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// // Job posting routes with sanctum authentication
// Route::middleware(['auth:sanctum'])->prefix('jobs')->group(function () {
//     // Route for creating a new job posting
//     Route::post('/create', [\App\Http\Controllers\JobPostingController::class, 'store'])
//         ->name('job.create');

//     // Route for retrieving all job postings
//     Route::get('/', [\App\Http\Controllers\JobPostingController::class, 'index'])
//         ->name('job.index');

//     // Route for retrieving a specific job posting
//     Route::get('/{jobPosting}', [\App\Http\Controllers\JobPostingController::class, 'show'])
//         ->name('job.show');

//     // Route for updating a job posting
//     Route::put('/{jobPosting}', [\App\Http\Controllers\JobPostingController::class, 'update'])
//         ->name('job.update');

//     // Route for deleting a job posting
//     Route::delete('/{jobPosting}', [\App\Http\Controllers\JobPostingController::class, 'destroy'])
//         ->name('job.delete');
// });


// authentication routes
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
    Route::apiResource('emergencycontact', EmergencyContactController::class);
    Route::apiResource('language', LanguageController::class);
    // file routes
    Route::controller(FileController::class)->prefix('applicant')->group(function () {
        Route::post('/profile', 'uploadProfile');
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
});

// HR Job Posting Routes
Route::get('/jobs', [CreateJobPosting::class, 'index']);
Route::get('/jobs/create', [CreateJobPosting::class, 'create']);
Route::post('/jobs', [CreateJobPosting::class, 'store']);
Route::get('/jobs/{id}', [CreateJobPosting::class, 'show']);
Route::delete('/jobs/{id}', [CreateJobPosting::class, 'destroy']);
Route::put('/jobs/{id}', [CreateJobPosting::class, 'update']);
