<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
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
            'name' => $this->name,
            'parent_department' => $this->when($this->parent_department_id, function () {
                return [
                    'id' => $this->parentDepartment->id,
                    'name' => $this->parentDepartment->name,
                ];
            }),
            'sub_departments' => DepartmentResource::collection($this->whenLoaded('subDepartments')),
            'employees_count' => $this->whenCounted('employees'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
