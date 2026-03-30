import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Axios with baseURL and token

export default function ChangePassword({ mode }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put('/user/change-password', {
        oldPassword,
        newPassword
      });
      setMessage(response.data);
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.error || 'Failed to change password');

    }
  };

  return (
    <div className="container my-5" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
      <h3>Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label className="form-label">Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}
