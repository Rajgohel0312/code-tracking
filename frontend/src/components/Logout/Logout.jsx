import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import axiosInstance from "../../axiosInstance";

const Logout = () => {
  const [error, setError] = useState(""); // Define the error state
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found.");
          return;
        }
        const response = await axiosInstance.post(
          "/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          {
            withCredentials: true,
          }
        );
        // If logout is successful, clear the token and update state
        localStorage.removeItem("token");
        setIsLoggedOut(true);
        navigate("/login"); // Redirect to login page
      } catch (err) {
        console.error(
          "Logout failed:",
          err.response ? err.response.data : err.message
        );
        setError("Logout failed. Please try again.");
      }
    };

    handleLogout(); // Automatically call handleLogout when component is mounted
  }, [navigate]); // Trigger the effect when the component mounts

  return (
    <div className="container mt-5">
      {isLoggedOut ? (
        <div className="alert alert-success">
          <h2>You have been logged out successfully!</h2>
        </div>
      ) : (
        <div>
          {error && <p className="text-danger">{error}</p>}{" "}
          {/* Display error if present */}
        </div>
      )}
    </div>
  );
};

export default Logout;
