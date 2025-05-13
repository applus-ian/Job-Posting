<?php

namespace App\Http\Requests\Application;

use Illuminate\Foundation\Http\FormRequest;

class ApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // update later 
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'expected_salary' => 'nullable|numeric|min:0',
            'resume' => 'required|file|mimes:pdf|max:5120',
            'coverletter' => 'required|file|mimes:pdf|max:5120'
        ];
    }
}
