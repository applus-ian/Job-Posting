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

    public function getDefaultDocument()
    {
        $data = $this->fileService->getDefaultApplicationFile();
        return response()->json($data, 200);
    }

    public function getFile(Document $document)
    {
        $response = $this->fileService->getApplicationFile($document);
        if (!$response) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return $response;
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
}
