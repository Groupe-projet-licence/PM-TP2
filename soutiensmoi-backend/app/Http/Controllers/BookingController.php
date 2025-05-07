<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'subject' => 'required|string',
            'date' => 'required|date',
            'message' => 'nullable|string',
        ]);

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            ...$validated
        ]);

        return response()->json(['message' => 'Booking created', 'booking' => $booking]);
    }

    public function index(Request $request) {
        $bookings = Booking::where('user_id', $request->user()->id)->get();
        return response()->json($bookings);
    }
}
