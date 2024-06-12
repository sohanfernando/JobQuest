import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import "./AdminDashBoard.css";
import Logo from "../../assets/logoBlack.png";
import { IoSettingsOutline } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import { GrSchedule } from "react-icons/gr";
import { Space, Table } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";
import axios from 'axios';
import { LuLogOut } from "react-icons/lu";

const { TextArea } = Input;

export default function CompanyListPage() {
    const [companies, setCompanies] = useState([]);
    const [activeComponent, setActiveComponent] = useState("companyList");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState({});
    const user = { name: 'Jason' };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/admins/getAllCompany');
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleDelete = (companyId) => {
        const companyToDelete = companies.find(company => company._id === companyId);
        setSelectedCompany(companyToDelete);
        setIsConfirmationModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8070/api/admins/deleteCompany/${selectedCompany._id}`);
            message.success('Company deleted successfully.');
            await fetchCompanies();
            setIsConfirmationModalVisible(false);
        } catch (error) {
            console.error('Error deleting company:', error);
            message.error('Error deleting company.');
        }
    };

    useEffect(() => {
        if (selectedCompany) {
            setFormData(selectedCompany);
        } else {
            setFormData({
                companyName: '',
                email: '',
                description: '',
                location: '',
                industry: ''
            });
        }
    }, [selectedCompany]);

    const handleOk = async () => {
        try {
            await axios.put(`http://localhost:8070/api/admins/updateCompany/${formData._id}`, formData);
            message.success('Company updated successfully.');
            setIsModalVisible(false);
            await fetchCompanies();
        } catch (error) {
            console.error('Error updating company:', error);
            message.error('Error updating company.');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateCompanyName = (rule, value, callback) => {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
            callback('Company name should not contain numbers');
        } else {
            callback();
        }
    };

    const validateIndustry = (rule, value, callback) => {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
            callback('Industry should not contain numbers');
        } else {
            callback();
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Nav defaultActiveKey="/home" className="flex-column bg-light text-white sidebar"
                         style={{minWidth: '250px', height: '100vh'}}>
                        <img src={Logo} alt="Logo" className="mt-3 mx-3 mb-3" style={{height: 'auto', width: '200px'}}/>
                        <Link to="/admin/dashboard" onClick={() => setActiveComponent("messages")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "dashboard" ? "nActive" : ""}`}>
                            <span className="icon-margin"><RiHome2Line/></span>
                            <span>DashBoard</span>
                        </Link>
                        {/* Messages */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><TiMessages className="text-danger mx-3"/></Col>
                            <Col xs={10}>
                                <Nav.Link className="text-danger" onClick={() => window.location.href = 'http://localhost:3001/'}>
                                    Messages
                                </Nav.Link>
                            </Col>
                        </Row>
                        <Link to="/admin/companyList" onClick={() => setActiveComponent("companyList")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "companyList" ? "nActive" : ""}`}>
                            <span className="icon-margin"><HiOutlineBuildingOffice2/></span>
                            <span>Company List</span>
                        </Link>
                        <Link to="/admin/institutionList" onClick={() => setActiveComponent("institute")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "institute" ? "nActive" : ""}`}>
                            <span className="icon-margin"><PiUsersThree/></span>
                            <span>Institute List</span>
                        </Link>
                        <Link to="/admin/mySchedule" onClick={() => setActiveComponent("schedule")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "schedule" ? "nActive" : ""}`}>
                            <span className="icon-margin"><GrSchedule/></span>
                            <span>My Schedule</span>
                        </Link>

                        <hr className="border-dark mt-4 mb-4 w-75 align-self-center"/>
                        <p className="text-uppercase mx-4" style={{color: "#747474"}}> Settings </p>

                        <Link to="/admin/settings" onClick={() => setActiveComponent("settings")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "settings" ? "nActive" : ""}`}>
                            <span className="icon-margin"><IoSettingsOutline/></span>
                            <span>Settings</span>
                        </Link>
                        <Link to="/" onClick={() => setActiveComponent("schedule")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "schedule" ? "nActive" : ""}`}>
                            <span className="icon-margin"><LuLogOut/></span>
                            <span>LogOut</span>
                        </Link>
                    </Nav>
                </Col>
                <Col md={10}>
                    <p className='text-3xl ml-4 mt-4 mb-0 greetingTag'>Good morning.</p>
                    <p className='ml-4'>Here is System's Company List.</p>
                    <Table dataSource={companies} className='m-3'>
                        <ColumnGroup title="Company List">
                            <Column title="Company Name" dataIndex="companyName" key="companyName" />
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="Description" dataIndex="description" key="description" />
                            <Column title="Location" dataIndex="location" key="location" />
                            <Column title="Industry" dataIndex="industry" key="industry" />
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button
                                            onClick={() => {
                                                setSelectedCompany(record);
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
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" onClick={handleOk}>
                                Update
                            </Button>,
                        ]}
                    >
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            layout="vertical"
                            initialValues={formData}
                        >
                            <Form.Item label="Company Name" name="companyName" rules={[{ required: true, validator: validateCompanyName }]}>
                                <Input onChange={handleChange} />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                                <Input onChange={handleChange} />
                            </Form.Item>
                            <Form.Item label="Description" name="description">
                                <TextArea onChange={handleChange} />
                            </Form.Item>
                            <Form.Item label="Location" name="location">
                                <Input onChange={handleChange} />
                            </Form.Item>
                            <Form.Item label="Industry" name="industry" rules={[{ required: true, validator: validateIndustry }]}>
                                <Input onChange={handleChange} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        visible={isConfirmationModalVisible}
                        onCancel={() => setIsConfirmationModalVisible(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setIsConfirmationModalVisible(false)}>
                                Cancel
                            </Button>,
                            <Button key="delete" type="primary" danger onClick={confirmDelete}>
                                Delete
                            </Button>
                        ]}
                    >
                        <p>Are you sure you want to delete {selectedCompany?.companyName}?</p>
                    </Modal>

                </Col>
            </Row>
        </Container>
    );
}
