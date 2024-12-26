<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogsController;
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
Route::middleware('auth:sanctum')->get('/check-token', [AuthController::class, 'checkTokenExpiration']);
// Route to get all blogs
Route::get('/blogs', [BlogsController::class, 'index']);

// Route to get a single blog by ID
Route::get('/blogs/{id}', [BlogsController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard/blogs', [BlogsController::class, 'adminIndex']);

    // Route to create a new blog
    Route::post('/dashboard/blogs', [BlogsController::class, 'store']);

    // Route to update an existing blog
    Route::put('/dashboard/blogs/{id}', [BlogsController::class, 'update']);

    // Route to delete a blog
    Route::delete('/dashboard/blogs/{id}', [BlogsController::class, 'destroy']);
});