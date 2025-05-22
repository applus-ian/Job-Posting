<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\EmployeeCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the employees.
     *
     * This function retrieves a paginated list of employees with optional filtering
     * by search term, department, job position, and employment type.
     * It returns the results as a resource collection.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search');
        $department = $request->input('department');
        $jobPosition = $request->input('job_position');
        $employmentType = $request->input('employment_type');

        $query = Employee::query()
            ->with(['jobPosition', 'employmentType', 'manager', 'department']);

        // Apply filters if provided
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($department) {
            $query->where('department_id', $department);
        }

        if ($jobPosition) {
            $query->where('job_position_id', $jobPosition);
        }

        if ($employmentType) {
            $query->where('employment_type_id', $employmentType);
        }

        $employees = $query->paginate($perPage);

        return new EmployeeCollection($employees);
    }

    /**
     * Store a newly created employee in storage.
     *
     * This function creates a new employee record in the database
     * using the data provided in the request and returns the newly
     * created employee as a resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validation rules would go here

        $employee = Employee::create($request->all());

        return new EmployeeResource($employee);
    }

    /**
     * Display the specified employee.
     *
     * This function retrieves a specific employee by ID with related data
     * (job position, employment type, manager, department) and returns it
     * as a resource. Returns a 404 error if the employee is not found.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $employee = Employee::with(['jobPosition', 'employmentType', 'manager', 'department'])
                ->findOrFail($id);

            return new EmployeeResource($employee);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Employee not found',
            ], 404);
        }
    }

    /**
     * Update the specified employee in storage.
     *
     * This function updates an existing employee record with the data
     * provided in the request and returns the updated employee as a resource.
     * Returns a 404 error if the employee is not found.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $employee = Employee::findOrFail($id);
            $employee->update($request->all());

            return new EmployeeResource($employee);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Employee not found',
            ], 404);
        }
    }

    /**
     * Remove the specified employee from storage.
     *
     * This function deletes an employee record from the database
     * and returns a success message. Returns a 404 error if the
     * employee is not found.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $employee = Employee::findOrFail($id);
            $employee->delete();

            return response()->json([
                'message' => 'Employee deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Employee not found',
            ], 404);
        }
    }

    /**
     * Get employees by job position
     *
     * This function retrieves a paginated list of employees who have
     * the specified job position ID. It includes related data and
     * returns the results as a resource collection.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $jobPositionId
     * @return \Illuminate\Http\Response
     */
    public function getByJobPosition(Request $request, $jobPositionId)
    {
        $perPage = $request->input('per_page', 15);

        $employees = Employee::with(['jobPosition', 'employmentType', 'manager', 'department'])
            ->where('job_position_id', $jobPositionId)
            ->paginate($perPage);

        return new EmployeeCollection($employees);
    }

    /**
     * Get employees by manager
     *
     * This function retrieves a paginated list of employees who report
     * to the specified manager ID. It includes related data and
     * returns the results as a resource collection.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $managerId
     * @return \Illuminate\Http\Response
     */
    public function getByManager(Request $request, $managerId)
    {
        $perPage = $request->input('per_page', 15);

        $employees = Employee::with(['jobPosition', 'employmentType', 'manager', 'department'])
            ->where('manager_id', $managerId)
            ->paginate($perPage);

        return new EmployeeCollection($employees);
    }

    /**
     * Get employees by department
     *
     * This function retrieves a paginated list of employees who belong
     * to the specified department ID. It includes related data and
     * returns the results as a resource collection.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $departmentId
     * @return \Illuminate\Http\Response
     */
    public function getByDepartment(Request $request, $departmentId)
    {
        $perPage = $request->input('per_page', 15);

        $employees = Employee::with(['jobPosition', 'employmentType', 'manager', 'department'])
            ->where('department_id', $departmentId)
            ->paginate($perPage);

        return new EmployeeCollection($employees);
    }
}
