<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\Route;
Route::get('/', function () {
    return view('welcome');
});

// Public contact form route (add rate limiting and optional auth)
Route::post('/contacts', [ContactController::class, 'store'])->middleware('throttle:contacts');

// Rate limiter for the /contacts endpoint
RateLimiter::for('contacts', function () {
    return Limit::perMinute(10);  // Limit to 10 requests per minute
});


Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::get('/contacts', [ContactController::class, 'index'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/total-contact-queries', [ContactController::class, 'getTotalContactQueries']);