<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Applicant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $frontendUrl = env('FRONTEND_URL');
            $oauthUser = Socialite::driver($provider)->stateless()->user();
            $user = User::updateOrCreate(
                ["{$provider}_id" => $oauthUser->getId()],
                [
                    'name' => $oauthUser->getName(),
                    'email' => $oauthUser->getEmail(),
                    "{$provider}_id" => $oauthUser->getId(),
                    'password' => null,
                ]
            );

            // Check if the user was just created
            if ($user->wasRecentlyCreated) {
                $first_name = '';
                $last_name = '';
                $middle_name = '';

                if ($provider === 'google') {
                    $first_name = $oauthUser->user['given_name'] ?? '';
                    $last_name = $oauthUser->user['family_name'] ?? '';
                }

                if ($provider === 'facebook') {
                    $first_name = $oauthUser->user['first_name'] ?? '';
                    $last_name = $oauthUser->user['last_name'] ?? '';
                    $middle_name = $oauthUser->user['middle_name'] ?? '';
                }

                Applicant::create([
                    'user_id' => $user->id,
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'middle_name' => $middle_name,
                ]);
            }

            Auth::login($user);
            $token = $user->createToken("auth_token")->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            \Log::error('OAuth callback error', ['error' => $e->getMessage()]);
            return redirect()->to("{$frontendUrl}/login");
        }
    }
}
