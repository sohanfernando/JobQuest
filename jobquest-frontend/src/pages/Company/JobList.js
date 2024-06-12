import React, { useEffect, useState } from 'react';
import {Button, message, Modal, Form, Input, Table, Space} from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";

export default function JobList() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [addFormData, setAddFormData] = useState({
        company:localStorage.getItem('userId'),
        title: '',
        description: '',
        location: '',
        industry: '',
    });
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        console.log('fetching jobs',localStorage.getItem('userId'));
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/company/getAllJobs/${localStorage.getItem('userId')}`);
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleDelete = async (jobId) => {
        try {
            await axios.delete(`http://localhost:8070/api/company/deleteJob/${jobId}`);
            message.success('Job deleted successfully.');
            await fetchJobs();
        } catch (error) {
            console.error('Error deleting job:', error);
            message.error('Error deleting job.');
        }
    };

    useEffect(() => {
        if (selectedJob) {
            setFormData(selectedJob);
        } else {
            setFormData({
                title: '',
                description: '',
                location: '',
                industry: '',
            });
        }
    }, [selectedJob]);
    const handleEdit = (job) => {
        setSelectedJob(job);
        setFormData(job);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8070/api/company/updateJob/${selectedJob._id}`, formData);
            message.success('Job updated successfully.');
            await fetchJobs();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error updating job:', error);
            message.error('Error updating job.');
        }
    };


    const handleAdd = async () => {
        console.log(addFormData);
        try {
            await axios.post(`http://localhost:8070/api/company/addJob`, addFormData);
            message.success('Job added successfully.');
            await fetchJobs();
            setIsAddModalVisible(false);
        } catch (error) {
            console.error('Error adding job:', error);
            message.error('Error adding job.');
        }
    };

    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setAddFormData({ ...addFormData, [name]: value });
    };

    return (
        <Container fluid>
            <Row>
                <Col md={10}>
                    <div className='w-fit flex'>
                        <p className='text-xl font-semibold  p-4'>Job Name</p>
                        <Button size='large' onClick={()=>setIsAddModalVisible(true)} className=' mr-2 mt-3 post-job-button' type="primary" danger block>
                            Post a Job
                        </Button>

                    </div>
                    <p className='text-3xl ml-4 mt-1 mb-0 greetingTag'>Job Listing</p>
                    <p className='ml-4'>Here is your job listings statistic report from July 19 - July 25.</p>
                    <Table dataSource={jobs} className='m-3'>
                        <ColumnGroup title="Job List">
                            <Column title="Title" dataIndex="title" key="title" />
                            <Column title="Description" dataIndex="description" key="description" />
                            <Column title="Location" dataIndex="location" key="location" />
                            <Column title="Industry" dataIndex="industry" key="industry" />
                            <Column
                                title="Applicants"
                                key="applicants"
                                render={(text, record) => (
                                    <Space direction="vertical">
                                        {record.applicants.map(applicant => (
                                            <div key={applicant._id}>
                                                <p>Applicant ID: {applicant.applicant}</p>
                                                <p>CV URL: <a href={applicant.cvURL}>{applicant.cvURL}</a></p>
                                                <p>Application Date: {new Date(applicant.applicationDate).toLocaleString()}</p>
                                                <p>Status: {applicant.status}</p>
                                            </div>
                                        ))}
                                    </Space>
                                )}
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button
                                            onClick={() => {
                                                setSelectedJob(record);
                                                setIsModalVisible(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
                                    </Space>
                                )}
                            />
                        </ColumnGroup>
                    </Table>


                    <Modal
                        title="Edit Job"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" onClick={handleSubmit}>
                                Update
                            </Button>,
                        ]}
                    >
                        <Form>
                            <Form.Item label="Company">
                                <Input disabled value={formData.company} />
                            </Form.Item>
                            <Form.Item label="Title"
                                       name="title"
                                       rules={[
                                           {
                                               message: 'Please input the title!',
                                           },
                                           {
                                               pattern: /^[^\d]+$/,
                                               message: 'Title cannot contain numbers!',
                                           },
                                       ]}
                            >
                                <Input name="title" value={formData.title} onChange={handleFormChange} />
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input.TextArea name="description" value={formData.description} onChange={handleFormChange} />
                            </Form.Item>
                            <Form.Item label="Location">
                                <Input name="location" value={formData.location} onChange={handleFormChange} />
                            </Form.Item>
                            <Form.Item label="Industry"
                                       name="industry"
                                       rules={[
                                           {
                                               message: 'Please input the industry!',
                                           },
                                           {
                                               pattern: /^[^\d]+$/,
                                               message: 'Industry cannot contain numbers!',
                                           },
                                       ]}
                            >
                                <Input name="industry" value={formData.industry} onChange={handleFormChange} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        title="Add Job"
                        visible={isAddModalVisible}
                        onCancel={() => setIsAddModalVisible(false)}
                        footer={[
                            <div className="btn btn-danger" key="cancel" onClick={() => setIsAddModalVisible(false)}>
                                Cancel
                            </div>,
                            <div className="btn btn-success mx-2" key="submit" onClick={handleAdd}>
                                Add
                            </div>,
                        ]}
                    >
                        <Form>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the title!',
                                    },
                                    {
                                        pattern: /^[^\d]+$/,
                                        message: 'Title cannot contain numbers!',
                                    },
                                ]}
                            >
                                <Input name="title" value={addFormData.title} onChange={handleAddFormChange} />
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input.TextArea name="description" value={addFormData.description} onChange={handleAddFormChange} />
                            </Form.Item>
                            <Form.Item label="Location">
                                <Input name="location" value={addFormData.location} onChange={handleAddFormChange} />
                            </Form.Item>
                            <Form.Item
                                label="Industry"
                                name="industry"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the industry!',
                                    },
                                    {
                                        pattern: /^[^\d]+$/,
                                        message: 'Industry cannot contain numbers!',
                                    },
                                ]}
                            >
                                <Input name="industry" value={addFormData.industry} onChange={handleAddFormChange} />
                            </Form.Item>
                        </Form>
                    </Modal>


                </Col>
            </Row>
        </Container>
    );
}