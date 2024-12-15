<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\Request;

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
            return response()->json(['message' => 'Invalid credntials'], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login Succesfull',
            'user' => $user,
            'token' => $token
        ]);
    }
    public function logout(Request $request)
    {
        // If using Sanctum for token-based auth
        $request->user()->tokens->each(function ($token) {
            $token->delete(); // Revoke all tokens for the user
        });

        // Or if using session-based auth:
        // auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
