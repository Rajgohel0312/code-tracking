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
        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Retrieve all contacts
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

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
