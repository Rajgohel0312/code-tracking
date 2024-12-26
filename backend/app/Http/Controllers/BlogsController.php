<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('limit', 1); // Default to 6 blogs per page
        $page = $request->input('page', 1); // Default to page 1

        // Fetch paginated blogs
        $blogs = Blogs::paginate($perPage);

        // Return the paginated blogs along with the total number of pages
        return response()->json([
            'blogs' => $blogs->items(),
            'totalPages' => $blogs->lastPage(),
        ]);
    }

    public function adminIndex()
    {

        $blogs = Blogs::all();

        return response()->json($blogs);
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
        // Validate the incoming request
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'excerpt' => 'nullable',
            'content' => 'nullable|string',
        ]);

        // Convert excerpt array to JSON string (or comma-separated string if preferred)
        $excerpt = $request->input('excerpt');
        if (is_array($excerpt)) {
            $excerpt = json_encode($excerpt); // Store as JSON string
        }
        // Create a new blog entry
        $blog = Blogs::create([
            'title' => $request->title,
            'author' => $request->author,
            'category' => $request->category,
            'excerpt' => $excerpt, // Store the excerpt as a string
            'content' => $request->content,
            'code' => $request->code ?? '',        // Default to empty string if null
        ]);

        // Return a response with success message and created blog data
        return response()->json(['message' => 'Blog created successfully', 'blog' => $blog], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blogs::findOrFail($id);
        return response()->json($blog);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blogs $blogs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $blog = Blogs::findOrFail($id);

        // Validate the incoming data
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'excerpt' => 'nullable',
        ]);
        $blog->update($validated);

        return response()->json(['message' => 'Blog updated successfully', 'blog' => $blog]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blog = Blogs::findOrFail($id);
        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully']);
    }
}
