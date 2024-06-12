import React, {useEffect, useState} from "react";
import {Button, Input, message, Typography} from 'antd';
import axios from "axios";
import {CgProfile} from "react-icons/cg";

export default function AdminProfile() {
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState({});

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:8070/api/admins/profile", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAdmin(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching admin profile:", error);
            message.error("Error fetching admin profile");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const updateAdminProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put("http://localhost:8070/api/admins/profile/update", newData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            message.success("Admin profile updated successfully");
            fetchAdminProfile();
        } catch (error) {
            console.error("Error updating admin profile:", error);
            message.error("Error updating admin profile");
        }
    };

    if (loading) {
        return <Typography.Title level={3}>Loading...</Typography.Title>;
    }

    return (
        <div className="border p-4 rounded-3 bg-light  mt-5">
            <div className="row">
                <div className="col">
                    <center>
                        <CgProfile style={{fontSize: '80px'}}/>
                        <Typography.Title className="mb-4"><span className="text-danger">Admin </span><span
                            className="text-success"> Profile</span></Typography.Title>
                    </center>
                    <div className="mb-3">
                        <Typography.Text>Admin Name</Typography.Text>
                        <Input
                            name="adminName"
                            value={newData.adminName || admin.adminName}
                            onChange={handleInputChange}
                            className="form-control mt-1"
                        />
                    </div>
                    <div className="mb-3">
                        <Typography.Text>Email</Typography.Text>
                        <Input
                            name="email"
                            value={newData.email || admin.email}
                            onChange={handleInputChange}
                            className="form-control mt-1"
                        />
                    </div>
                    <center>
                        <Button onClick={updateAdminProfile}>Update Profile</Button>
                    </center>
                </div>
            </div>
        </div>
    );
}
