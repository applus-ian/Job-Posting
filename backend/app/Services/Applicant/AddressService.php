<?php

namespace App\Services\Applicant;

class AddressService
{
    public function createAddress(array $data, $user)
    {
        $user->applicant->address()->create($data);
        return ['message' => 'Address added successfully!'];
    }

    public function updateAddress(array $data, $address)
    {
        $address->update($data);
        return ['message' => 'Address updated successfully!'];
    }

    public function deleteAddress($address)
    {
        // check if address exists 
        if (!$address) {
            return null;
        }

        $address->delete();
        return ['message' => 'Address deleted successfully!'];
    }
}
