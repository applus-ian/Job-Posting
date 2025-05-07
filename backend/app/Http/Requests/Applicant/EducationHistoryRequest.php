<?php

namespace App\Http\Requests\Applicant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EducationHistoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // update
        if ($this->isMethod('put')) {
            $educationhistory = $this->route('educationhistory');
            return Auth::check() && Auth::id() === $educationhistory->applicant->user_id;
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
            'school' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'start_year' => 'required|digits:4|integer|min:1900|max:' . date('Y'),
            'end_year' => 'nullable|digits:4|integer|gte:start_year|max:' . date('Y'),
        ];
    }
}
