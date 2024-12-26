import axios from "axios";

// Check if we're in a production environment or development environment
const baseURL =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000/" // Localhost URL for development
    : "https://spectechitsolution.com/api/"; // Production URL

// Create axios instance with dynamic baseURL
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to check token expiration
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token and expiration time from localStorage
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    // If both token and expiry time exist, check if the token has expired
    if (token && tokenExpiry) {
      const expirationDate = new Date(tokenExpiry);
      const isExpired = expirationDate <= new Date();

      if (isExpired) {
        // Token expired, remove token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");

        // Redirect user to login page
        window.location.href = "/login"; // Adjust URL accordingly
        return Promise.reject("Token expired"); // Reject the request
      }

      // Attach the token to the request headers
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Add a response interceptor to handle expired token responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Proceed with the response
  },
  (error) => {
    // If the error response indicates token expiration, remove token and redirect to login
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Token expired. Please log in again."
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error); // Handle other errors
  }
);

export default axiosInstance;
