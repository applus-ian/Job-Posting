<?php

namespace App\Http\Requests\Applicant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class LanguageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // update
        if ($this->isMethod('put')) {
            $language = $this->route('language');
            return Auth::check() && Auth::id() === $language->applicant->user_id;
        }
        // create
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'language' => 'required|string|max:100',
            'proficiency_level' => 'required|string|in:beginner,intermediate,advanced,fluent,native',
        ];
    }
}
