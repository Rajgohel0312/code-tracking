import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits long.";
    }

    if (!formData.subject) {
      errors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/contacts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage(response.data.message);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      return true;
    } catch (err) {
      setError("Failed to send your message. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="text-center fw-bold my-5 title-contact">
        Contact our support team to know
        <br /> What you Want
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className="text-danger">{formErrors.name}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="text-danger">{formErrors.email}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                className="form-control"
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {formErrors.phone && (
                <div className="text-danger">{formErrors.phone}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <label className="form-label" htmlFor="subject">
                Subject
              </label>
              <select
                className="form-select"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="internship">Internship</option>
                <option value="enquiry">Enquiry</option>
              </select>
              {formErrors.subject && (
                <div className="text-danger">{formErrors.subject}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12">
          <div>
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && (
              <div className="text-danger">{formErrors.message}</div>
            )}
          </div>
        </div>

        <button
          className="btn btn-dark w-100 mx-auto text-center my-3"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {statusMessage && (
        <div className="alert alert-success my-3" role="alert">
          {statusMessage}
        </div>
      )}

      {error && (
        <div className="alert alert-danger my-3" role="alert">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-center my-3">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
