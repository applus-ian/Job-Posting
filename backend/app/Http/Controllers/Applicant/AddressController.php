<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\AddressRequest;
use App\Models\Address;
use App\Services\Applicant\AddressService;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function __construct(protected AddressService $addressService)
    {
    }

    public function store(AddressRequest $request)
    {
        $data = $this->addressService->createAddress($request->validated(), $request->user());
        return response()->json($data, 201);
    }

    public function update(AddressRequest $request, Address $address)
    {
        $data = $this->addressService->updateAddress($request->validated(), $address);
        return response()->json($data, 200);
    }

    public function destroy(Address $address)
    {
        $data = $this->addressService->deleteAddress($address);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
