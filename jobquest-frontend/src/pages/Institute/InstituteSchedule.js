import React, { useEffect, useState } from 'react';
import {Modal, Form, Input, Button, message, Calendar, Badge, DatePicker} from 'antd';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import "./InstituteDash.css";
import Logo from "../../assets/logoBlack.png";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import { GrSchedule } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from 'axios';
import { LuLogOut } from "react-icons/lu";
import moment from 'moment';
import {TiMessages} from "react-icons/ti";
import {IoSettingsOutline} from "react-icons/io5";
import {FaRegQuestionCircle} from "react-icons/fa";
const { TextArea } = Input;

export default function InstituteSchedule() {
    const [activeComponent, setActiveComponent] = useState("schedule");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({task: '', date: null,userid:null});
    const [tasks, setTasks] = useState([]);
    const user = { name: 'Jason' };

    useEffect(() => {
        setFormData({...formData, userid: localStorage.getItem('userId')});
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/admins/getTasks/${localStorage.getItem('userId')}`)
            console.log(response.data)
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (value) => {
        setFormData({ ...formData, date: value.toISOString() });
    };

    const handleFormSubmit = async () => {
        console.log("formdata", formData);
        console.log(formData);
        if (formData.task && formData.date) {
            try {
                await axios.post(`http://localhost:8070/api/admins/addTask`, formData);
                fetchTasks();
                setFormData({task: '', date: null,userid:null});
                message.success('Task added successfully!');
            } catch (error) {
                console.error('Error adding task:', error);
                message.error('Failed to add task. Please try again later.');
            }
        } else {
            message.error('Please fill in all fields.');
        }
    };

    const getListData = (value) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const tasksForDate = tasks.filter(task => {
            const taskDate = moment(task.date).format('YYYY-MM-DD');
            return taskDate === formattedDate;
        });
        console.log("tsd", tasksForDate);
        return tasksForDate.map(task => ({
            type: 'success',
            content: task.task,
        }));
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Nav defaultActiveKey="/home" className="flex-column bg-light text-white sidebar" style={{minWidth: '250px', height: '100vh'}}>
                        <img src={Logo} alt="Logo" className="mt-3 mx-3 mb-3" style={{height: 'auto', width: '200px'}}/>
                        <Link to="/institute/dashboard" onClick={() => setActiveComponent("dashboard")}
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
                        <Link to="/institute/courseList" onClick={() => setActiveComponent("courseList")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "courseList" ? "nActive" : ""}`}>
                            <span className="icon-margin"><HiOutlineBuildingOffice2/></span>
                            <span>Course List</span>
                        </Link>
                        <Link to="/institute/mySchedule" onClick={() => setActiveComponent("schedule")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "schedule" ? "nActive" : ""}`}>
                            <span className="icon-margin"><GrSchedule/></span>
                            <span>My Schedule</span>
                        </Link>
                        <hr className="border-dark mt-4 mb-4 w-75 align-self-center" />
                        <p className="text-uppercase mx-4" style={{color:"#747474"}}> Settings </p>
                        <Link to="/instituteProfile" onClick={() => setActiveComponent("profile")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "profile" ? "nActive" : ""}`}>
                            <span className="icon-margin"><IoSettingsOutline/></span>
                            <span>Settings</span>
                        </Link>
                        <Link to="/help" onClick={() => setActiveComponent("help")} className="sidebar-text custom-nav-link"><span className="icon-margin"><FaRegQuestionCircle /> </span>Help Center</Link>
                        <Link to="/" onClick={() => setActiveComponent("schedule")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "logout" ? "nActive" : ""}`}>
                            <span className="icon-margin"><LuLogOut/></span>
                            <span>LogOut</span>
                        </Link>
                    </Nav>
                </Col>
                <Col md={10}>
                    <Form layout="inline" style={{marginTop:'1rem',marginLeft:'1rem'}}>
                        <Form.Item label="Task Name">
                            <Input name="task" value={formData.task} onChange={handleFormChange} />
                        </Form.Item>
                        <Form.Item label="Date">
                            <DatePicker onChange={handleDateChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleFormSubmit}>Add Task</Button>
                        </Form.Item>
                    </Form>
                    <Calendar dateCellRender={dateCellRender} />

                </Col>
            </Row>
        </Container>
    );
}
