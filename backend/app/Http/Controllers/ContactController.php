<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Auth;
use Crypt;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $contacts = Contact::all();

        // Decrypt email and phone fields
        $contacts->each(function ($contact) {
            $contact->email = Crypt::decryptString($contact->email);
            $contact->phone = Crypt::decryptString($contact->phone);
        });

        // Return contacts as a JSON response
        return response()->json($contacts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|digits_between:10,15',
            'subject' => 'required|in:internship,enquiry',
            'message' => 'required|string',
        ]);
        // Sanitize message or other fields if necessary
        $validated['message'] = strip_tags($validated['message']);
        $validated['email'] = Crypt::encryptString($validated['email']);
        $validated['phone'] = Crypt::encryptString($validated['phone']);

        Contact::create($validated);

        return response()->json(['message' => 'Your message has been sent successfully.'], 201);
    }
    public function getTotalContactQueries()
    {
        $count = Contact::count(); // Get the total count of contacts
        return response()->json(['count' => $count]);
    }

}
