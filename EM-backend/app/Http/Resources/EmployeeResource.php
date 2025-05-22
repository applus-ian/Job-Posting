<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'suffix' => $this->suffix,
            'gender' => $this->gender->value,
            'birthdate' => $this->birthdate->format('Y-m-d'),
            'civil_status' => $this->civil_status->value,
            'contact' => [
                'email' => $this->email,
                'phone_number' => $this->phone_number,
                'emergency_contact1' => $this->emergency_contact1,
                'emergency_contact2' => $this->emergency_contact2,
            ],
            'address' => [
                'full_address' => $this->full_address,
                'street' => $this->street,
                'barangay' => $this->barangay,
                'city_or_municipality' => $this->city_or_municipality,
                'province' => $this->province,
                'region' => $this->region,
            ],
            'nationality' => $this->nationality,
            'employment' => [
                'job_position' => $this->whenLoaded('jobPosition', function() {
                    return [
                        'id' => $this->jobPosition->id,
                        'title' => $this->jobPosition->title,
                    ];
                }),
                'date_hired' => $this->date_hired->format('Y-m-d'),
                'employment_type' => $this->whenLoaded('employmentType', function() {
                    return [
                        'id' => $this->employmentType->id,
                        'name' => $this->employmentType->name,
                    ];
                }),
                'department' => $this->whenLoaded('department', function() {
                    return [
                        'id' => $this->department->id,
                        'name' => $this->department->name,
                    ];
                }),
            ],
            'manager' => $this->when($this->manager_id, function() {
                return [
                    'id' => $this->manager->id,
                    'name' => $this->manager->full_name,
                ];
            }),
            'profile_pic_url' => $this->profile_pic_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
