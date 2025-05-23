<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth Routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Employee API Routes
Route::prefix('employees')->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);
    Route::post('/', [EmployeeController::class, 'store']);
    Route::get('/{id}', [EmployeeController::class, 'show'])->where('id', '[0-9]+');
    Route::put('/{id}', [EmployeeController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/{id}', [EmployeeController::class, 'destroy'])->where('id', '[0-9]+');

    // Additional employee endpoints
    Route::get('/job-position/{jobPositionId}', [EmployeeController::class, 'getByJobPosition']);
    Route::get('/manager/{managerId}', [EmployeeController::class, 'getByManager']);
    Route::get('/department/{departmentId}', [EmployeeController::class, 'getByDepartment']);
});

// Department API Routes
Route::prefix('departments')->group(function () {
    Route::get('/', [DepartmentController::class, 'index']);
    Route::post('/', [DepartmentController::class, 'store']);
    Route::get('/{id}', [DepartmentController::class, 'show'])->where('id', '[0-9]+');
    Route::put('/{id}', [DepartmentController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/{id}', [DepartmentController::class, 'destroy'])->where('id', '[0-9]+');

    // Additional department endpoints
    Route::get('/{id}/sub-departments', [DepartmentController::class, 'getSubDepartments'])->where('id', '[0-9]+');
    Route::get('/{id}/employees', [DepartmentController::class, 'getEmployees'])->where('id', '[0-9]+');
});

// Job Positions API (if needed)
// Route::apiResource('job-positions', JobPositionController::class);

// Employment Types API (if needed)
// Route::apiResource('employment-types', EmploymentTypeController::class);
