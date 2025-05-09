<?php

namespace App\Services\Applicant;

use App\Models\Document;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public function handleProfileUpload(array $data, $user)
    {
        $file = $data['profile'];
        $originalName = $file->getClientOriginalName();
        $path = $this->storeToFile($file, 'profile');
        $this->storeToDatabase($originalName, $path, 'profile', $user->applicant->id);
        return ['message' => 'Profile uploaded successfully!'];
    }

    public function handleApplicationUpload(array $data, $user, $type)
    {
        $file = $data['file'];
        $originalName = $file->getClientOriginalName();
        $path = $this->storeToFile($file, $type);
        $this->storeToDatabase($originalName, $path, $type, $user->applicant->id);
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

    private function storeToDatabase($name, $path, $type, $id)
    {
        Document::create([
            'file_name' => $name,
            'file_path' => $path,
            'type' => $type,
            'applicant_id' => $id
        ]);
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
