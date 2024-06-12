import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserSettings() {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        userType: ""
    });
    const [newUserName, setNewUserName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newUserType, setNewUserType] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8070/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8070/api/user/${userData._id}`,
                {
                    userName: newUserName,
                    email: newEmail,
                    userType: newUserType
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.status === 200) {
                // If update is successful, fetch updated user data
                const updatedResponse = await axios.get("http://localhost:8070/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (updatedResponse.status === 200) {
                    setUserData(updatedResponse.data);
                    setNewUserName("");
                    setNewEmail("");
                    setNewUserType("");
                }
            }
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    return (
        <div >
            <h1 className="mt-5 mb-4">User Settings</h1>
            <div className="row">
                <div className="col">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label">User Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newUserType}
                        onChange={(e) => setNewUserType(e.target.value)}
                    />
                </div>
            </div>
            <button className="btn btn-dark rounded-5 p-2 mt-2" onClick={handleUpdateProfile}>Update Profile</button>
        </div>
    );
}
