import React, { useState, useEffect } from "react";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const contactsPerPage = 10; // Number of contacts per page

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/contacts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });

        if (response.ok) {
          const data = await response.json();
          setContacts(data); // Set the fetched contacts data into state
        } else {
          setError("Failed to fetch contacts"); // If response is not ok
        }
      } catch (error) {
        setError("Error fetching contacts"); // If error occurs during fetch
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchContacts();
  }, []);

  // Format the date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // Day of the week (e.g., Monday)
      year: "numeric", // Full year (e.g., 2024)
      month: "long", // Full month name (e.g., December)
      day: "numeric", // Day of the month (e.g., 15)
    });
  };

  // Sort contacts by created_at in descending order (newest first)
  const sortedContacts = [...contacts].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  // Get the contacts for the current page
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = sortedContacts.slice(indexOfFirstContact, indexOfLastContact);

  // Pagination button handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading contacts...</p>
      </div>
    ); // Display loading message with spinner
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>; // Display error message if fetch fails
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact List</h2>
      {contacts.length === 0 ? (
        <div className="alert alert-warning text-center">
          No contacts available at the moment. Please check back later.
        </div>
      ) : (
        <>
          {/* Display the sorted and paginated contacts */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {currentContacts.map((contact) => (
              <div key={contact.id} className="col">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{contact.name}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {contact.email}
                    </p>
                    <p className="card-text">
                      <strong>Phone:</strong> {contact.phone}
                    </p>
                    <p className="card-text">
                      <strong>Message:</strong> {contact.message}
                    </p>
                    <p className="card-text">
                      <strong>Date:</strong> {formatDate(contact.created_at)}
                    </p>
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
                {/* Dynamic pagination buttons */}
                {Array.from(
                  { length: Math.ceil(contacts.length / contactsPerPage) },
                  (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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
                    disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}
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

export default AdminContact;
