import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, Space, Table} from 'antd';
import {Col, Container, Nav, Row} from 'react-bootstrap';
import "./AdminDashBoard.css";
import Logo from "../../assets/logoBlack.png";
import {IoSettingsOutline} from "react-icons/io5";
import {TiMessages} from "react-icons/ti";
import {FaRegQuestionCircle} from "react-icons/fa";
import {RiHome2Line} from "react-icons/ri";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {PiUsersThree} from "react-icons/pi";
import {GrSchedule} from "react-icons/gr";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import {Link} from "react-router-dom";
import axios from "axios";
import {LuLogOut} from "react-icons/lu";

const {TextArea} = Input;

export default function InstitutesListPage() {
    const [institutes, setInstitutes] = useState([]);
    const [activeComponent, setActiveComponent] = useState("institutionList");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState(null);
    const [formData, setFormData] = useState({});
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [deletingInstituteId, setDeletingInstituteId] = useState(null);

    useEffect(() => {
        fetchInstitutes();
    }, []);

    const fetchInstitutes = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/admins/getAllInstitutes');
            setInstitutes(response.data);
        } catch (error) {
            console.error('Error fetching institutes:', error);
        }
    };

    const handleDelete = (companyId) => {
        setDeletingInstituteId(companyId);
        setDeleteConfirmationVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8070/api/admins/deleteInstitute/${deletingInstituteId}`);
            message.success('Institute deleted successfully.');
            await fetchInstitutes();
        } catch (error) {
            console.error('Error deleting institute:', error);
            message.error('Error deleting institute.');
        } finally {
            setDeletingInstituteId(null);
            setDeleteConfirmationVisible(false);
        }
    };

    const handleCancelDelete = () => {
        setDeletingInstituteId(null);
        setDeleteConfirmationVisible(false);
    };

    const onFinish = async () => {
        try {
            await axios.put(`http://localhost:8070/api/admins/updateInstitute/${formData._id}`, formData);
            message.success('Institute updated successfully.');
            setIsModalVisible(false);
            await fetchInstitutes();
        } catch (error) {
            console.error('Error updating institute:', error);
            message.error('Error updating institute.');
        }
    };

    // Form validation rules
    const validateInstituteName = (_, value) => {
        if (!value) {
            return Promise.reject('Please enter institute name.');
        } else if (/\d/.test(value)) {
            return Promise.reject('Institute name cannot contain numbers.');
        } else {
            return Promise.resolve();
        }
    };

    const validateIndustry = (_, value) => {
        if (!value) {
            return Promise.reject('Please enter industry.');
        } else if (/\d/.test(value)) {
            return Promise.reject('Industry cannot contain numbers.');
        } else {
            return Promise.resolve();
        }
    };

    const validateWebsiteUrl = (_, value) => {
        if (!value) {
            return Promise.reject('Please enter website URL.');
        } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
            return Promise.reject('Please enter a valid website URL.');
        } else {
            return Promise.resolve();
        }
    };

    const validateEmail = (_, value) => {
        if (!value) {
            return Promise.reject('Please enter email.');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            return Promise.reject('Please enter a valid email address.');
        } else {
            return Promise.resolve();
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
                              className={`sidebar-text custom-nav-link ${activeComponent === "institutionList" ? "nActive" : ""}`}>
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
                    <p className='text-3xl ml-4 mt-4 mb-0 greetingTag'>Hello..</p>
                    <p className='ml-4'>Here is System's Institute List.</p>
                    <Table dataSource={institutes} className='m-3'>
                        <ColumnGroup title="Institute List">
                            <Column title="Institute Name" dataIndex="instituteName" key="instituteName"/>
                            <Column title="Email" dataIndex="email" key="email"/>
                            <Column title="Description" dataIndex="description" key="description"/>
                            <Column title="Location" dataIndex="location" key="location"/>
                            <Column title="Website URL" dataIndex="websiteUrl" key="websiteUrl"/>
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button
                                            onClick={() => {
                                                setSelectedInstitute(record);
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
                        onCancel={() => setIsModalVisible(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>,
                            <Button key="submit" htmlType="submit" onClick={onFinish}>
                                Update
                            </Button>,
                        ]}
                    >
                        <Form
                            onFinish={onFinish}
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Institute Name"
                                name="instituteName"
                                initialValue={formData.instituteName}
                                rules={[
                                    {required: true, message: 'Please enter institute name.'},
                                    {validator: validateInstituteName},
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Industry"
                                name="industry"
                                initialValue={formData.industry}
                                rules={[
                                    {required: true, message: 'Please enter industry.'},
                                    {validator: validateIndustry},
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                initialValue={formData.email}
                                rules={[
                                    {required: true, message: 'Please enter email.'},
                                    {validator: validateEmail},
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Website URL"
                                name="websiteUrl"
                                initialValue={formData.websiteUrl}
                                rules={[
                                    {required: true, message: 'Please enter website URL.'},
                                    {validator: validateWebsiteUrl},
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                initialValue={formData.description}
                            >
                                <TextArea rows={4}/>
                            </Form.Item>
                            <Form.Item
                                label="Location"
                                name="location"
                                initialValue={formData.location}
                            >
                                <Input/>
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        visible={deleteConfirmationVisible}
                        onCancel={handleCancelDelete}
                        footer={[
                            <Button key="cancel" onClick={handleCancelDelete}>
                                Cancel
                            </Button>,
                            <Button key="confirm" type="danger" onClick={confirmDelete}>
                                Confirm Delete
                            </Button>
                        ]}
                    >
                        <p>Are you sure you want to delete this institute?</p>
                    </Modal>

                </Col>
            </Row>
        </Container>
    );
}