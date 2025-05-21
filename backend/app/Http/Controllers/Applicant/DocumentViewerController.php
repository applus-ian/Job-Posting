<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class DocumentViewerController extends Controller
{
    public function viewResume($filename)
    {
        $path = storage_path('app/private/resume/' . $filename);

        if (!file_exists($path)) {
            abort(404, 'Resume not found.');
        }

        return response()->file($path, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $filename . '"',
        ]);
    }

    public function viewCoverLetter($filename)
    {
        $path = storage_path('app/public/document/coverletter/' . $filename);

        if (!file_exists($path)) {
            abort(404, 'Cover Letter not found.');
        }

        return response()->file($path, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $filename . '"',
        ]);
    }
}
