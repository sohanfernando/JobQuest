import {Button, Checkbox, Flex, Input, Typography,message} from 'antd';

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateCompanyProfile() {
  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const userIdFromLocalStorage = localStorage.getItem('userId');
        if (userIdFromLocalStorage) {
          setUserId(userIdFromLocalStorage);
          const response = await axios.get(
              `http://localhost:8070/api/company/profile/${userIdFromLocalStorage}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
          );

          if (response.status === 200) {
            setUserData(response.data);
            setUpdatedUserData(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
          `http://localhost:8070/api/company/profileupdate/${userId}`,
          updatedUserData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );

      if (response.status === 200) {
        console.log("User data updated successfully");
        message.info("User data updated successfully");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4">
        <h2 className="text-center mb-4">Update Company Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              value={updatedUserData.companyName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Gmail
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={updatedUserData.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={updatedUserData.description || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={updatedUserData.location || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
            Industry
            </label>
            <input
              type="text"
              className="form-control"
              id="industry"
              name="industry"
              value={updatedUserData.industry || ""}
              onChange={handleInputChange}
            />
          </div>
          
          
          <div className="mb-3 row">
            <div className="col-sm-8 offset-sm-4">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  
  );
}