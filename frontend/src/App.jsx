import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader"; // Import the loader component
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Logout from "./components/Logout/Logout";
import AllBlogs from "./components/BlogPages/AllBlogs";
import BlogDetails from "./components/BlogPages/SingleBlog";

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
  const blogs = [
    {
      id: 1,
      title: "React Basics",
      author: "John Doe",
      description: "Learn the fundamentals of React.",
      image: "https://via.placeholder.com/300x200", // Replace with actual image URL
      outline: [
        "Introduction to React",
        "Components and Props",
        "State and Lifecycle",
        "Handling Events",
        "Conditional Rendering",
      ],
      code: `
      import React from 'react';

      const App = () => {
        return <h1>Hello, React!</h1>;
      };

      export default App;
    `,
    },
    {
      id: 2,
      title: "Understanding State in React",
      author: "Jane Smith",
      description: "A guide to managing state in React applications.",
      image: "https://via.placeholder.com/300x200", // Replace with actual image URL
      outline: [
        "What is State?",
        "Using useState Hook",
        "State Management Best Practices",
        "Lifting State Up",
        "Introduction to Context API",
      ],
      code: `
      import React, { useState } from 'react';

      const Counter = () => {
        const [count, setCount] = useState(0);

        return (
          <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        );
      };

      export default Counter;
    `,
    },
  ];

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/dashboard/*" element={<Dashboard />} exact />
          <Route path="/logout" element={<Logout />} exact />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<BlogDetails blogs={blogs} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
