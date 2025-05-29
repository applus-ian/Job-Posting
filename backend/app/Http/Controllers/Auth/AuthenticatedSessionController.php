<?php

namespace App\Http\Controllers\Auth;

use App\Enums\TokenAbility;
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

        $accessTokenExpiration = now()->addMinutes(config('sanctum.access_token_expiration'));
        $refreshTokenExpiration = now()->addMinutes(config('sanctum.refresh_token_expiration'));
        $token = $user->createToken('auth_token', [TokenAbility::ACCESS_API->value], $accessTokenExpiration)->plainTextToken;
        $refreshToken = $user->createToken('refresh_token', [TokenAbility::ISSUE_ACCESS_TOKEN->value], $refreshTokenExpiration)->plainTextToken;

        return response()->json([
            'applicant_id' => $user->applicant->id,
            'name' => $user->applicant->full_name,
            'email' => $user->email,
            'profile' => Storage::disk('profile')->url($user->profile),
            'token' => $token,
            'refresh_token' => $refreshToken
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
        $user = $request->user();
        $user->tokens()
            ->where('name', 'auth_token')
            ->delete();
        $accessTokenExpiration = now()->addMinutes(config('sanctum.access_token_expiration'));
        $token = $user->createToken('auth_token', [TokenAbility::ACCESS_API->value], $accessTokenExpiration)->plainTextToken;

        return response()->json(['token' => $token]);
    }
}
