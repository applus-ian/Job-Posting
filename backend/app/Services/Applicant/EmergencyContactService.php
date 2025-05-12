<?php

namespace App\Services\Applicant;

use Illuminate\Support\Facades\Auth;

class EmergencyContactService
{
    public function createEmergencyContact(array $data, $user)
    {
        $user->applicant->emergencyContact()->create($data);
        return ['message' => 'Emergency contact added successfully!'];
    }

    public function updateEmergencyContact(array $data, $emergencycontact)
    {
        $emergencycontact->update($data);
        return ['message' => 'Emergency contact updated successfully!'];
    }

    public function deleteEmergencyContact($emergencycontact)
    {
        // check if emergencycontact exists && check owner of the emergencycontact
        if (!$emergencycontact || $emergencycontact->applicant->user_id !== Auth::id()) {
            return null;
        }

        $emergencycontact->delete();
        return ['message' => 'Emergency contact deleted successfully!'];
    }
}
