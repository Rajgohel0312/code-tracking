import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance"; // Your Axios instance for API calls
import "./BlogDetails.css"; // Import custom CSS for styling
import Navbar from "../Navbar/Navbar";

const BlogDetails = () => {
  const sections = [
    { id: "home", name: "Home", href: "/" },
    { id: "blogs", name: "Blogs", href: "/blogs" },
  ];
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        setBlog(response.data); // Set the fetched blog data
      } catch (err) {
        setError("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const wrapCodeInPre = (content) => {
    return content.replace(/(<code>)(.*?)(<\/code>)/g, (match, p1, p2, p3) => {
      return `<pre class="ql-syntax" spellcheck="false">${p2}</pre>`;
    });
  };

  // Loading state while fetching data
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/blogs" className="btn btn-secondary mt-3">
          Back to Blog List
        </Link>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <>
      <Navbar sections={sections} />
      <div className="container mt-5 blog-container">
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-meta mb-4">
          <p className="category-name">
            <strong>Category:</strong> {blog.category}
          </p>
          <p className="published-date">
            <strong>Published At:</strong>{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Excerpt */}
        <h3 className="blog-section-title">Excerpt</h3>
        <p className="blog-excerpt">{blog.excerpt}</p>

        {/* Blog Content */}
        <h3 className="blog-section-title">Content</h3>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: wrapCodeInPre(blog.content),
          }}
        />

        <Link to="/blogs" className="btn btn-secondary my-4 blog-back-btn">
          Back to Blog List
        </Link>
      </div>
    </>
  );
};

export default BlogDetails;
