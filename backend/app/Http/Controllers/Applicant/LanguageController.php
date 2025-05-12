<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Applicant\LanguageRequest;
use App\Models\Language;
use App\Services\Applicant\LanguageService;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function __construct(protected LanguageService $languageService)
    {
    }

    public function store(LanguageRequest $request)
    {
        $data = $this->languageService->createLanguage($request->validated(), $request->user());
        return response()->json($data, 201);
    }

    public function update(LanguageRequest $request, Language $language)
    {
        $data = $this->languageService->updateLanguage($request->validated(), $language);
        return response()->json($data, 200);
    }

    public function destroy(Language $language)
    {
        $data = $this->languageService->deleteLanguage($language);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
