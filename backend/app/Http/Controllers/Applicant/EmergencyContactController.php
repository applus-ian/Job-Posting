<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\EmergencyContactRequest;
use App\Models\EmergencyContact;
use App\Services\Applicant\EmergencyContactService;
use Illuminate\Http\Request;

class EmergencyContactController extends Controller
{
    public function __construct(protected EmergencyContactService $emergencyContactService)
    {
    }

    public function store(EmergencyContactRequest $request)
    {
        $data = $this->emergencyContactService->createEmergencyContact($request->validated(), $request->user());
        return response()->json($data, 201);
    }

    public function update(EmergencyContactRequest $request, EmergencyContact $emergencycontact)
    {
        $data = $this->emergencyContactService->updateEmergencyContact($request->validated(), $emergencycontact);
        return response()->json($data, 200);
    }

    public function destroy(EmergencyContact $emergencycontact)
    {
        $data = $this->emergencyContactService->deleteEmergencyContact($emergencycontact);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
