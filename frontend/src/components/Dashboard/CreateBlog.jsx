import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's default theme
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const BlogCreation = ({ isUpdate = false }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    content: "",
    category: "",
    excerpt: [],
    code: "",
  });
  const [newExcerpt, setNewExcerpt] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    if (isUpdate && id) {
      const fetchBlogData = async () => {
        try {
          const response = await axiosInstance.get(`blogs/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          let excerptData = response.data.excerpt;
          if (typeof excerptData === "string") {
            excerptData = excerptData.split(",").map((item) => item.trim());
          } else if (!Array.isArray(excerptData)) {
            excerptData = [];
          }

          setBlogData({
            ...response.data,
            excerpt: excerptData,
          });
        } catch (error) {
          console.error(error);
          toast.error("Error fetching blog data");
        }
      };
      fetchBlogData();
    }
  }, [id, isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExcerptChange = (e) => {
    setNewExcerpt(e.target.value);
  };

  const addExcerpt = () => {
    if (newExcerpt.trim() === "") {
      toast.error("Please enter a valid excerpt!");
      return;
    }

    if (blogData.excerpt.includes(newExcerpt.trim())) {
      toast.error("This excerpt already exists!");
      return;
    }

    setBlogData((prevData) => ({
      ...prevData,
      excerpt: [...prevData.excerpt, newExcerpt.trim()],
    }));
    setNewExcerpt(""); // Clear the input field after adding
  };

  const removeExcerpt = (index) => {
    setBlogData((prevData) => ({
      ...prevData,
      excerpt: prevData.excerpt.filter((_, i) => i !== index),
    }));
  };

  const handleContentChange = (content) => {
    setBlogData((prevData) => ({
      ...prevData,
      content: content,
    }));
  };

  // Function to clean the content and remove unwanted code
  const cleanContent = (content) => {
    // Remove any unwanted "copy code" divs or similar unwanted elements
    return content.replace(/<div class="ql-syntax"[^>]*>.*?<\/div>/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogData.title || !blogData.author || !blogData.content) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      let response;

      const updatedBlogData = {
        ...blogData,
        excerpt: blogData.excerpt.join(", "),
        content: cleanContent(blogData.content), // Clean the content before sending it
      };

      if (isUpdate) {
        response = await axiosInstance.put(
          `/dashboard/blogs/${id}`,
          updatedBlogData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        toast.success("Blog updated successfully!");
      } else {
        response = await axiosInstance.post(
          "/dashboard/blogs",
          updatedBlogData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        toast.success("Blog created successfully!");
      }
      history("/dashboard/blogs"); // Redirect to blogs list after submit
    } catch (error) {
      console.error(error);
      toast.error("Failed to create or update blog!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">
        {isUpdate ? "Update Blog" : "Create New Blog"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={blogData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Excerpt</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              value={newExcerpt}
              onChange={handleExcerptChange}
              placeholder="Enter excerpt item"
            />
            <button
              type="button"
              className="btn btn-success ms-2"
              onClick={addExcerpt}
            >
              Add
            </button>
          </div>

          <div className="mt-2">
            <strong>Excerpt List:</strong>
            <ul>
              {Array.isArray(blogData.excerpt) &&
                blogData.excerpt.map((item, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between my-2"
                  >
                    {item}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => removeExcerpt(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <ReactQuill
            value={blogData.content}
            onChange={handleContentChange}
            theme="snow"
            className="quill-editor-container"
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link"],
                ["image"],
                [{ align: [] }],
                [{ size: ["small", "normal", "large", "huge"] }],
                ["code-block"], // If this is not needed, remove this line
              ],
            }}
            placeholder="Write your blog content here..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Save Blog"
          )}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default BlogCreation;
