<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faq;

class FaqController extends Controller
{
    // List all FAQs (public)
    public function index()
    {
        $faqs = Faq::all();
        return response()->json($faqs);
    }

    // Show a single FAQ
    public function show($id)
    {
        $faq = Faq::findOrFail($id);
        return response()->json($faq);
    }

    // Create a new FAQ (protected)
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string'
        ]);

        $faq = Faq::create($validated);
        return response()->json($faq, 201);
    }

    // Update an existing FAQ (protected)
    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $validated = $request->validate([
            'question' => 'sometimes|required|string',
            'answer' => 'sometimes|required|string'
        ]);

        $faq->update($validated);
        return response()->json($faq);
    }

    // Delete an FAQ (protected)
    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();
        return response()->json(['message' => 'FAQ deleted']);
    }
}
