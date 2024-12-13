<?php
use App\Http\Controllers\ContactController;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\Route;
Route::get('/', function () {
    return view('welcome');
});
Route::get('/main', function () {
     return response()->json([
        'success' => true,
        'message' => 'This is a test route',
        'data' => [
            'key1' => 'value1',
            'key2' => 'value2',
        ],
    ]);
});

// Public contact form route (add rate limiting and optional auth)
Route::post('/contacts', [ContactController::class, 'store'])->middleware('throttle:contacts');

// Rate limiter for the /contacts endpoint
RateLimiter::for('contacts', function () {
    return Limit::perMinute(10);  // Limit to 10 requests per minute
});


Route::get('/test-storage', function () {
    $path = Storage::disk('public')->put('example.txt', 'This is a test file.');
    return 'File saved at: ' . $path;
});