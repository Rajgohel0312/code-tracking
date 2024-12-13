import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader"; // Import the loader component

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
  }, [loading]); // Re-run effect when loading state changes

  return (
    <>
      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        <Home /> // Show Home component when loading is complete
      )}
    </>
  );
}

export default App;
