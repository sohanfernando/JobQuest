// AdminList.js

import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import axios from 'axios';
import {MdOutlineRefresh} from "react-icons/md";

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loggedInAdminEmail, setLoggedInAdminEmail] = useState("");

    useEffect(() => {
        fetchAdmins();
        const loggedInAdminEmail = localStorage.getItem('adminEmail');
        setLoggedInAdminEmail(loggedInAdminEmail);
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/admins');
            const filteredAdmins = response.data.filter(admin => admin.email !== loggedInAdminEmail);
            setAdmins(filteredAdmins);
        } catch (error) {
            console.error('Error fetching admins:', error);
            message.error('Failed to fetch admins');
        }
    };

    const handleDelete = async (adminId) => {
        try {
            await axios.delete(`http://localhost:8070/api/admins/${adminId}`);
            message.success('Admin deleted successfully');
            fetchAdmins();
        } catch (error) {
            console.error('Error deleting admin:', error);
            message.error('Failed to delete admin');
        }
    };

    const handleRefresh = () => {
        fetchAdmins();
    };

    const columns = [
        {
            title: 'Admin Name',
            dataIndex: 'adminName',
            key: 'adminName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    okType="primary"
                    title="Are you sure you want to delete this admin?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="border p-4 rounded-3 bg-light">
            <h2><span className="text-danger">Admin </span> <span className="text-success"> List</span></h2>
            <Button className="float-end" onClick={handleRefresh}><MdOutlineRefresh /></Button>
            <Table dataSource={admins} columns={columns}/>
        </div>
    );
};

export default AdminList;
