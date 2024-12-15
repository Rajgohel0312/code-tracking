import axios from "axios";

// Check if we're in a production environment or development environment
const baseURL = window.location.hostname === "localhost" 
    ? "http://127.0.0.1:8000/" // Localhost URL for development
    : "https://spectechitsolution.com/api/"; // Production URL

// Log the baseURL to check if it's set correctly
console.log(`API baseURL is set to: ${baseURL}`);

// Create axios instance with dynamic baseURL
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
