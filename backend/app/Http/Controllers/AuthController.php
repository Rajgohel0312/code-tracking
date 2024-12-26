<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Clear old tokens (optional, ensures one active token per user)
        $user->tokens()->delete();

        // Create new token with 24 hours expiration
        $token = $user->createToken('api-token', ['*'], now()->addDay())->plainTextToken;

        return response()->json([
            'message' => 'Login Successful',
            'user' => $user,
            'token' => $token,
            'expires_at' => Carbon::now('Asia/Kolkata')->addDay()->toDateTimeString() // Expiration set to 1 day from now
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens for the user
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function checkTokenExpiration(Request $request)
    {
        $token = $request->bearerToken();
        $user = $request->user();

        if ($user && $token) {
            $tokenCreationTime = $user->currentAccessToken()->created_at;
            // Check if token is expired after 24 hours
            if (Carbon::now('Asia/Kolkata')->diffInHours($tokenCreationTime) >= 24) {
                $user->currentAccessToken()->delete(); // Revoke expired token
                return response()->json(['message' => 'Token expired. Please log in again.'], 401);
            }
        }

        return response()->json(['message' => 'Token is valid']);
    }
}