import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/blogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/dashboard/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error(error);
      setError("Error deleting blog");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Blog List</h2>

      {/* Create Blog Button */}
      <div className="mb-4 text-center">
        <Link className="btn btn-primary" to="createBlog">
          Create New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="alert alert-warning text-center">
          No blogs available at the moment. Please check back later.
        </div>
      ) : (
        <>
          {/* Display blogs */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="col">
                <div className="card rounded-4 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text text-muted">
                      <strong>Author:</strong> {blog.author}
                    </p>
                    <p className="card-text text-muted">
                      <strong>Category:</strong> {blog.category}
                    </p>
                    <p className="card-text">{blog.excerpt}</p>
                    <p className="card-text text-muted">
                      <strong>Date:</strong> {formatDate(blog.created_at)}
                    </p>

                    {/* Update and Delete buttons */}
                    <div className="d-flex justify-content-between mt-3">
                      <Link
                        className="btn btn-warning btn-sm"
                        to={`update/${blog.id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from(
                  { length: Math.ceil(blogs.length / blogsPerPage) },
                  (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage === Math.ceil(blogs.length / blogsPerPage)
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBlogs;
