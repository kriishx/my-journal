import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditEntry({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axiosInstance.get(`/journal/id/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEntry({
          title: res.data.title,
          content: res.data.content,
        });
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load journal entry.");
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/journal/id/${id}`, entry, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success("Entry updated successfully!");
      navigate('/entries');
    } catch (err) {
      toast.error("Failed to update entry.");
    }
  };

  if (loading) return <div className="mt-4">Loading entry...</div>;

  return (
    <div className="container my-4" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
      <h2 className="mb-4 text-center">Edit Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={entry.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            name="content"
            rows="6"
            value={entry.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn" style={{ backgroundColor: '#7a23b5', color: 'white' }}>
          Update Entry
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/entries')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
