import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import Navbar from "../Navbar/Navbar";
import "./BlogDetails.css";

const AllBlogs = () => {
  const sections = [
    { id: "home", name: "Home", href: "/" },
    { id: "blogs", name: "Blogs", href: "#blogs" },
  ];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const blogsPerPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/blogs?page=${currentPage}&limit=${blogsPerPage}`
        );
        setBlogs(response.data.blogs); // Set the blogs data for the current page
        setTotalPages(response.data.totalPages); // Set the total pages from the backend
      } catch (err) {
        setError(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]); // Re-fetch blogs every time currentPage changes

  const truncateText = (text = "", maxLength) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update the current page state
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar sections={sections} />
      <div className="container mainBlogContainer my-5 mt-5">
        <h2 className="text-center my-5 text-primary">Our Blogs</h2>
        {blogs.length === 0 ? (
          <div className="alert alert-warning text-center">
            No blogs available at the moment.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="col">
                <div className="card h-100 rounded-4 shadow-lg border-light bg-light">
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title text-dark fw-semibold mb-3">
                      {truncateText(blog.title || "No Title", 50)}
                    </h5>
                    <p className="card-text text-muted mb-4">
                      Category:
                      {truncateText(
                        blog.category || "No description available.",
                        100
                      )}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/blog/${blog.id}`}
                        className="btn btn-primary w-100 py-2 rounded-pill shadow-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container mt-4 text-center">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {/* Display page numbers dynamically */}
                {[...Array(totalPages).keys()].map((index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
