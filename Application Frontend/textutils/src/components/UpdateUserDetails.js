import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateUserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    phone: '',
    address: {
      hno: '',
      city: '',
      state: '',
      country: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['hno', 'city', 'state', 'country'].includes(name)) {
      setUserDetails((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
        "http://localhost:8080/user/change-details",
        userDetails,
        {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        }
        );

        console.log("Update successful", response);
        toast.success("User details updated successfully");
    } catch (error) {
        console.error("Update failed", error.response?.data || error.message);
        toast.error("Failed to update user details");
    }
    };

  return (
    <div className="container mt-5">
      <h2>Update User Details</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            required
          />
        </div>

        <h5>Address</h5>

        <div className="mb-3">
          <label htmlFor="hno" className="form-label">House Number</label>
          <input
            type="text"
            className="form-control"
            name="hno"
            value={userDetails.address.hno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={userDetails.address.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={userDetails.address.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={userDetails.address.country}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Details</button>
      </form>
    </div>
  );
};

export default UpdateUserDetails;
