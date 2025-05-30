<?php

namespace App\Http\Requests\Interview;

use Illuminate\Foundation\Http\FormRequest;

class InterviewScheduleRequest extends FormRequest
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
            'schedule_date' => 'required|date|after_or_equal:today',
            'schedule_time' => 'required|date_format:H:i',
            'mode' => 'required|in:in_person,virtual',
            'meeting_link' => 'nullable|url|required_if:mode,virtual',
            'platform' => 'nullable|string|required_if:mode,virtual',
            'location' => 'nullable|string|required_if:mode,in_person',
            'status' => 'nullable|in:upcoming,completed,rescheduled,no-show,cancelled,rejected',
        ];
    }
}
