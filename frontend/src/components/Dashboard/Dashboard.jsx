import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom"; // Import necessary routing components
import axiosInstance from "../../axiosInstance"; // Import axiosInstance for API requests
import "./Dashboard.css";
import AdminContact from "./AdminContact";
import AdminBlogs from "./AdminBlogs";
import BlogCreation from "./CreateBlog";

const Dashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [contentActive, setContentActive] = useState(false);
  const [contactCount, setContactCount] = useState(0); // State to hold the contact count
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [error, setError] = useState(null); // Error state for API request
  const navigate = useNavigate(); // Use navigate hook for redirection

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
    setContentActive(!contentActive);
  };

  useEffect(() => {
    // Check if the user is logged in (you can check token or any other method)
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token found, redirect to login
      navigate("/login");
      return; // Ensure the rest of the code doesn't run if not logged in
    }

    const fetchContactCount = async () => {
      try {
        const response = await axiosInstance.get("total-contact-queries", {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        });

        if (response.status === 200) {
          setContactCount(response.data.count); // Set the fetched count into the state
        } else {
          setError("Failed to fetch contact count");
        }
      } catch (error) {
        setError("Error fetching contact count");
      } finally {
        setLoading(false);
      }
    };

    fetchContactCount();
  }, [navigate]); // Adding navigate in the dependency array to make sure it's updated

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Display error if fetching fails
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`text-dark p-3 position-fixed ${
          sidebarActive ? "active" : ""
        }`}
        style={{
          width: "250px",
          top: "0",
          left: sidebarActive ? "0" : "",
          transition: "left 0.3s ease",
        }}
      >
        <div className="text-center">
          <img
            className="img-fluid mb-5 mt-2"
            width={"150px"}
            src="/Logo.png"
            alt=""
          />
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" end>
              <i className="fa-solid fa-gauge-simple-high"></i> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/contacts">
              <i className="fa-solid fa-user"></i> Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/blogs">
              <i className="fa-solid fa-user"></i> Blogs
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div
        id="content"
        className={`flex-grow-1 ms-250 p-3 ${contentActive ? "active" : ""}`}
        style={{ transition: "margin-left 0.3s ease" }}
      >
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg  rounded-1 navbar-light bg-light">
          <button
            className="btn btn-outline-secondary sidebar-toggle"
            id="sidebar-toggle"
            onClick={toggleSidebar}
            style={{ fontSize: "1.5rem", color: "#343a40" }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Dashboard
            </a>
            <div className="d-flex">
              <a className="btn btn-outline-danger ms-2" href="/logout">
                Logout
              </a>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-4">
                <div className="row">
                  <div className="col-12">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">
                          Welcome, <b>to SPECTECH IT SOLUTION</b>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">Contact Queries</h5>
                        {loading ? (
                          <div>Loading...</div>
                        ) : error ? (
                          <div style={{ color: "red" }}>{error}</div>
                        ) : (
                          <div>
                            <h3>{contactCount}</h3>
                            <p>Total contact queries</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="contacts"
            element={
              <div className="container mt-4">
                <AdminContact />
              </div>
            }
          />
          <Route
            path="blogs"
            element={
              <div className="container mt-4">
                <AdminBlogs />
              </div>
            }
          />
          <Route
            path="blogs/createBlog"
            element={
              <div className="container mt-4">
                <BlogCreation />
              </div>
            }
          />
          <Route
            path="blogs/update/:id"
            element={
              <div className="container mt-4">
                <BlogCreation isUpdate={true} />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
