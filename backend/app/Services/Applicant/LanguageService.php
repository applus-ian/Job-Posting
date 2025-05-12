<?php

namespace App\Services\Applicant;

use Illuminate\Support\Facades\Auth;

class LanguageService
{
    public function createLanguage(array $data, $user)
    {
        $user->applicant->language()->create($data);
        return ['message' => 'Language added successfully!'];
    }

    public function updateLanguage(array $data, $language)
    {
        $language->update($data);
        return ['message' => 'Language updated successfully!'];
    }

    public function deleteLanguage($language)
    {
        // check if language exists && check owner of the language
        if (!$language || $language->applicant->user_id !== Auth::id()) {
            return null;
        }

        $language->delete();
        return ['message' => 'Language deleted successfully!'];
    }
}
