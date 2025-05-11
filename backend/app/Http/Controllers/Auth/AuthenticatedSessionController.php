<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;


class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $user = $request->user();

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            'applicant_id' => $user->applicant->id,
            'name' => $user->applicant->full_name,
            'email' => $user->email,
            'profile' => Storage::disk('profile')->url($user->profile),
            'token' => $token
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }

    // refresh token
    public function update(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        $token = $request->user()->createToken("auth_token")->plainTextToken;
        return response()->json(['token' => $token]);
    }
}
