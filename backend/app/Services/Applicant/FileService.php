<?php

namespace App\Services\Applicant;

use App\Models\Document;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public function handleProfileUpload(array $data, $user)
    {
        $file = $data['profile'];
        $originalName = $file->getClientOriginalName();
        $path = $this->storeToFile($file, 'profile');
        $this->deleteOldProfile($user);
        $this->storeToDatabase($originalName, $path, 'profile', $user);
        return [
            'profile' => Storage::disk('profile')->url($path),
            'message' => 'Profile uploaded successfully!'
        ];
    }

    public function handleApplicationUpload(array $data, $user, $type)
    {
        $file = $data['file'];
        $originalName = $file->getClientOriginalName();
        $path = $this->storeToFile($file, $type);
        $this->storeToDatabase($originalName, $path, $type, $user);
        return ['message' => 'Application file uploaded successfully!'];
    }

    public function deleteApplicationFile($document, $type)
    {
        $file = $document->file_path;
        $documentDeleted = $this->deleteFromDatabase($document);
        if ($documentDeleted) {
            $fileDeleted = $this->deleteFromFile($type, $file);
            if ($fileDeleted)
                return ['message' => 'Application file deleted successfully!'];
        }
        return null;
    }

    public function downloadApplicationFile($document, $type)
    {
        if (!$document) {
            return null;
        }
        $file = $document->file_path;
        if (Storage::disk($type)->exists($file)) {
            return Storage::disk($type)->path($file);
        }
        return null;
    }

    private function storeToFile($file, $disk)
    {
        $name = $file->hashName();
        $path = $file->storeAs('', $name, $disk);
        return $path;
    }

    private function storeToDatabase($name, $path, $type, $user)
    {
        // applicant profile
        if ($type === 'profile') {
            $user->update(['profile' => $path]);
            return;
        }

        if (!$user->applicant) {
            return;
        }

        // resume or cover letter
        Document::create([
            'file_name' => $name,
            'file_path' => $path,
            'type' => $type,
            'applicant_id' => $user->applicant->id
        ]);
    }

    private function deleteOldProfile($user)
    {
        if (Storage::disk('profile')->exists($user->profile)) {
            Storage::disk('profile')->delete($user->profile);
        }
    }

    private function deleteFromFile($type, $file)
    {
        if (Storage::disk($type)->exists($file)) {
            Storage::disk($type)->delete($file);
            return true;
        }
        return false;
    }

    private function deleteFromDatabase($document)
    {
        if (!$document || $document->applicant->user_id !== Auth::id()) {
            return false;
        }
        $document->delete();
        return true;
    }
}
