<?php

namespace App\Http\Controllers\Hr;

use App\Http\Controllers\Controller;
use Exception;
use GuzzleHttp\Psr7\Message;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Models\JobPosting;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Mockery\Expectation;
use Nette\Schema\Expect;
use function PHPUnit\Framework\returnArgument;

class CreateJobPosting extends Controller
{
    public function index()
    {
        try{
            $jobPostings = JobPosting::all();
            if(request()->expectsJson()){
                return response()->json([
                    'message' => 'Job posting retrieves successfully',
                    'data' => $jobPostings
                ], 200);
            }
        }catch(QueryException $e){
            return response()->json([
                'message' => 'Database Error',
                'error' => $e->getMessage()
            ],500);
        }
    }
    public function create()
    {
        return view('jobs.create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|string|max:100',
                'description' => 'required|string',
                'vacancies' => 'required|integer|min:1',
                'salary_type' => 'nullable|in:monthly,hourly,weekly,annually',
                'salary_min' => 'nullable|numeric',
                'salary_max' => 'nullable|numeric|gte:salary_min',
                'employment_type' => 'required|string',
                'employment_level' => 'required|string',
                'work_setup' => 'required|string',
                'status' => 'required|in:open,closed,draft',
                'address_id' => 'nullable|exists:addresses,id',
            ]);

            $jobPosting = JobPosting::create($validated);

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Job posting created successfully',
                    'data' => $jobPosting
                ], 201);
            }

            return redirect()->route('public.jobs.create')->with('success', 'Job posted!');
        } catch (ValidationException $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }
            throw $e;
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Database error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id){
        try
        {
            $jobPosting = JobPosting::findOrFail($id);
            if(request()->expectsJson()){
                return response()->json([
                    'message' => 'Retrieved Successfully',
                    'data'=>$jobPosting
                ],200);
            }
        }catch(Exception $e){
            return response()->json([
                'message' => 'No job posting found',
                'error' => $e->getMessage()
            ],404);
        }
    }

    public function destroy($id){
        try{
            $job = JobPosting::findOrFail($id);
            $job->delete();

            if(request()->expectsJson()){
                return response()->json([
                    'message' => 'Deleted Succesfully',
                    'isDelete' => True
                ],200);
            }

        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'Job posting not Found',
                'isUpdate' => False,
                'error' => $e->getMessage()
            ],404);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Failed to delet job posting',
                'isUpdate' => False,
                'error' => $e->getMessage()
            ],500);
        }
    }

    public function update(Request $request, $id){
        try{
            $validate = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'category' => 'sometimes|required|string|max:100',
                'description' => 'sometimes|required|string',
                'vacancies' => 'sometimes|required|integer|min:1',
                'salary_type' => 'sometimes|nullable|in:monthly,hourly,weekly,annually',
                'salary_min' => 'sometimes|nullable|numeric',
                'salary_max' => 'sometimes|nullable|numeric|gte:salary_min',
                'employment_type' => 'sometimes|required|string',
                'employment_level' => 'sometimes|required|string',
                'work_setup' => 'sometimes|required|string',
                'status' => 'sometimes|required|in:open,closed,draft',
                'address_id' => 'nullable|exists:addresses,id',
            ]);
            $jobposting = JobPosting::findOrFail($id);
            $jobposting->update($validate);
            if(request()->expectsJson()){
                return response()->json([
                    'message' => 'Job posting Updated succesfully',
                    'isUpdate' => True
                ],200);
            }
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'Job posting failed to update',
            ],404);
        }catch(QueryException $e){
            return response()->json([
                'message' => 'Database error',
                'isUpdate' => False,
                'error' => $e->getMessage()
            ],500);
        }catch(ValidationException $e){
            return response()->json([
                'message' => 'Validation error',
                'error' => $e-> getMessage(),
                'isUpdate' => False
            ],422);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Failed to update the job posting',
                'isUpdate' => False,
                'error' => $e->getMessage(),
            ],500);
        }

    }


}
