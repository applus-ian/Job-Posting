<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\UploadApplicationFilesRequest;
use App\Http\Requests\Applicant\UploadProfileRequest;
use App\Models\Document;
use App\Services\Applicant\FileService;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function __construct(protected FileService $fileService)
    {
    }

    public function getFile(Document $document)
    {
        $path = $this->fileService->getApplicationFile($document);
        if (!$path) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return $path;
    }

    public function uploadProfile(UploadProfileRequest $request)
    {
        $data = $this->fileService->handleProfileUpload($request->validated(), $request->user());
        return response()->json($data, 201);
    }

    public function uploadResume(UploadApplicationFilesRequest $request)
    {
        $data = $this->fileService->handleApplicationUpload($request->validated(), $request->user(), 'resume');
        return response()->json($data, 201);
    }

    public function uploadCoverLetter(UploadApplicationFilesRequest $request)
    {
        $data = $this->fileService->handleApplicationUpload($request->validated(), $request->user(), 'coverletter');
        return response()->json($data, 201);
    }

    public function deleteResume(Document $document)
    {
        $data = $this->fileService->deleteApplicationFile($document, 'resume');
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }

    public function deleteCoverLetter(Document $document)
    {
        $data = $this->fileService->deleteApplicationFile($document, 'coverletter');
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }

    public function downloadResume(Document $document)
    {
        $data = $this->fileService->downloadApplicationFile($document, 'resume');
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->download($data);
    }

    public function downloadCoverLetter(Document $document)
    {
        $data = $this->fileService->downloadApplicationFile($document, 'coverletter');
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->download($data);
    }

    public function viewResume(Document $document)
    {
        try {
            $path = storage_path('app/private/resume/' . $document->file_name);
            \Log::info('Attempting to view PDF: ' . $path);
            
            if (!file_exists($path)) {
                \Log::error('File not found: ' . $path);
                // return response()->json(['message' => 'File not found: ' . $document->file_name], 404);
                return response()->json(['message' => 'File not found'], 404);
            }

            \Log::info('File exists, attempting to serve');
            return response()->file($path, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="' . $document->file_name . '"'
            ]);
        } catch (\Exception $e) {
            \Log::error('PDF View Error: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            return response()->json(['message' => 'Error viewing file: ' . $e->getMessage()], 500);
        }
    }

    public function viewCoverLetter(Document $document)
    {
        $path = $this->fileService->getApplicationFile($document);
        if (!$path || !file_exists($path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return response()->file($path, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $document->file_name . '"'
        ]);
    }

}
