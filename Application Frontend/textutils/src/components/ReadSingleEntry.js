import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export default function ReadSingleEntry({ mode }) {
  const { id } = useParams(); // 📌 receives id from URL
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: 'Delete Entry?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await axiosInstance.delete(`/journal/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success("Entry deleted!");
      setTimeout(() => navigate("/entries"), 2000);
    } catch (err) {
      toast.error("Failed to delete entry.");
    }
  }
};



  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axiosInstance.get(`/journal/id/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEntry(response.data);
      } catch (err) {
        console.error('Error fetching journal entry:', err);
        setError("Failed to fetch entry. Please try again.");
      }
    };

    fetchEntry();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (!entry) {
    return <div className="mt-3">Loading...</div>;
  }

  return (
    <div className="container my-4" style={{ color: mode === "dark" ? "white" : "black" }}>
      <h2 className="mb-3 text-center">{entry.title}</h2>
      <div
        className="p-4 rounded"
        style={{
          backgroundColor: mode === "dark" ? "#2b2b40" : "#f8f9fa",
          border: "1px solid #ced4da",
          whiteSpace: "pre-wrap",
          textAlign: "justify",
        }}
      >
        {entry.content}
      </div>
      <button
        className="btn mt-4"
        style={{ backgroundColor: '#7a23b5', color: 'white' }}
        onClick={() => navigate("/entries")}
      >
        Go Back
      </button>
      <button
        className="btn mt-4 me-2 mx-3"
        style={{ backgroundColor: '#dc3545', color: 'white' }}
        onClick={handleDelete}
      >
        Delete Entry
      </button>

      <button
        className="btn btn-warning mt-3 mx-2 my-20"
        onClick={() => navigate(`/edit/${entry.id}`)}
      >
        Edit Entry
      </button>

    </div>
  );
}
