<?php

use App\Http\Controllers\Auth\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Social Account Routes
Route::controller(SocialAuthController::class)
    ->prefix('/auth/{provider}')
    ->group(function () {
        Route::get('/redirect', 'redirect');
        Route::get('/callback', 'callback');
    });
