<?php

use App\Http\Controllers\ContactController;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\Route;

// Public contact form route (add rate limiting and optional auth)
Route::post('/contacts', [ContactController::class, 'store'])->middleware('throttle:contacts');

// Rate limiter for the /contacts endpoint
RateLimiter::for('contacts', function () {
    return Limit::perMinute(10);  // Limit to 10 requests per minute
});

Route::middleware('auth:sanctum')->get('/contacts', [ContactController::class, 'index']);