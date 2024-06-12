import React from 'react';
import { Form, Input, Button, message, notification } from 'antd';
import axios from 'axios';

const CreateAdminForm = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8070/api/admins/register', values);
            if (response.status === 201) {
                message.success('Admin created successfully');
                notification.success({
                    message: 'Admin Created',
                    description: 'The admin has been created successfully.',
                });
                alert('Admin created successfully');
                form.resetFields();
            }
        } catch (error) {
            console.error('Error creating admin:', error);
            message.error('Failed to create admin');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            className="border p-4 rounded-3 bg-light"
            name="createAdminForm"
            initialValues={{ userType: 'admin' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <h2><span className="text-danger">Create </span> <span className="text-success"> Admin</span></h2>
            <Form.Item
                label="Admin Name"
                name="adminName"
                rules={[{ required: true, message: 'Please input the admin name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input the email!' },
                    { type: 'email', message: 'Please enter a valid email address!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input the password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="default" htmlType="submit">
                    Create Admin
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateAdminForm;
