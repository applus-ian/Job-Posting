<?php

namespace App\Http\Requests\JobPosting;

use Illuminate\Foundation\Http\FormRequest;

class JobPostingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // update later for the hr
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->isMethod('patch')) {
            return [
                'status' => 'sometimes|in:open,draft,closed',
            ];
        }
        return [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|json',
            'vacancies' => 'required|integer|min:1',
            'salary_type' => 'required|in:monthly,hourly,weekly,annually',
            'salary_min' => 'required|numeric|min:0',
            'salary_max' => 'required|numeric|gte:salary_min',
            'employment_type' => 'required|string|max:255',
            'employment_level' => 'required|string|max:255',
            'work_setup' => 'required|string|max:255',
            'status' => 'required|in:open,draft,closed',
            'address_id' => 'nullable|exists:addresses,id',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'address' => 'required|string',
            'country' => 'required|string',
            'province' => 'required|string',
            'city' => 'required|string',
            'street' => 'required|string',
            'zipcode' => 'required|string',
        ];
    }
}
