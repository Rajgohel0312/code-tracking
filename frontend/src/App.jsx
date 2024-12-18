import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader"; // Import the loader component
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Logout from "./components/Logout/Logout";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add .loader class to body when loader is active
    if (loading) {
      document.body.classList.add("loader");
    } else {
      // Remove .loader class from body when loader is removed
      document.body.classList.remove("loader");
    }

    // Simulate loading of resources
    const loadResources = () => {
      setTimeout(() => {
        setLoading(false); // Once resources are loaded, hide the loader
      }, 3000); // Simulate a 3-second loading time
    };

    loadResources();

    // Cleanup: Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("loader");
    };
  }, [loading]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login /> }  exact />
          <Route path="/dashboard/*" element={<Dashboard />} exact />
          <Route path="/logout" element={<Logout />} exact />
        </Routes>
      )}
    </Router>
  );
}

export default App;
