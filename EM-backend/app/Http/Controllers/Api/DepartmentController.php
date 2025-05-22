<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\DepartmentCollection;
use App\Http\Resources\EmployeeCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the departments.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search');
        $parentOnly = $request->boolean('parent_only', false);

        $query = Department::query()
            ->withCount('employees');

        // Apply filters if provided
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($parentOnly) {
            $query->whereNull('parent_department_id');
        }

        $departments = $query->paginate($perPage);

        return new DepartmentCollection($departments);
    }

    /**
     * Store a newly created department in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validation rules would go here

        $department = Department::create($request->all());

        return new DepartmentResource($department);
    }

    /**
     * Display the specified department.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $department = Department::with(['parentDepartment', 'subDepartments'])
                ->withCount('employees')
                ->findOrFail($id);

            return new DepartmentResource($department);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Department not found',
            ], 404);
        }
    }

    /**
     * Update the specified department in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $department = Department::findOrFail($id);
            $department->update($request->all());

            return new DepartmentResource($department);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Department not found',
            ], 404);
        }
    }

    /**
     * Remove the specified department from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $department = Department::findOrFail($id);

            // Check if department has sub-departments
            if ($department->subDepartments()->count() > 0) {
                return response()->json([
                    'message' => 'Cannot delete department with sub-departments',
                ], 422);
            }

            $department->delete();

            return response()->json([
                'message' => 'Department deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Department not found',
            ], 404);
        }
    }

    /**
     * Get all sub-departments of a department.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getSubDepartments($id)
    {
        try {
            $department = Department::findOrFail($id);
            $subDepartments = $department->subDepartments()
                ->withCount('employees')
                ->get();

            return DepartmentResource::collection($subDepartments);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Department not found',
            ], 404);
        }
    }

    /**
     * Get all employees in a department.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getEmployees(Request $request, $id)
    {
        try {
            $department = Department::findOrFail($id);
            $perPage = $request->input('per_page', 15);

            $employees = Employee::with(['jobPosition', 'employmentType', 'manager', 'department'])
                ->where('department_id', $id)
                ->paginate($perPage);

            return new EmployeeCollection($employees);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Department not found',
            ], 404);
        }
    }
}
