<?php

namespace App\Http\Requests\Applicant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ApplicantInformationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // update
        if ($this->isMethod('put')) {
            $applicant = $this->route(param: 'applicant');
            return Auth::check() && Auth::id() === $applicant->user_id;
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
        $nameRules = function ($minLength = 2) {
            return [
                'string',
                "min:$minLength",
                'max:50',
                'regex:/^[a-zA-ZÀ-ÖØ-öø-ÿ\' .-]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ\' .-]+)*$/',
            ];
        };

        return [
            'professional_title' => 'nullable|string|max:255',
            'biography' => 'nullable|string|max:1000',
            'first_name' => array_merge(['required'], $nameRules()),
            'middle_name' => array_merge(['nullable'], $nameRules(1)),
            'last_name' => array_merge(['required'], $nameRules()),
            'suffix' => array_merge(['nullable'], $nameRules(1)),
            'sex' => 'nullable|string|in:male,female',
            'date_of_birth' => 'nullable|date|before:today',
            'nationality' => 'nullable|string|max:100',
            'phone_number' => 'nullable|string|max:20|regex:/^\+?[0-9]{1,4}?[0-9]{7,15}$/', // not final regex pattern for phone number
            // missing address request validation
        ];
    }
}
