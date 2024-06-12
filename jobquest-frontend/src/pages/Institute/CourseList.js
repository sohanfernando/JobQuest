import React, { useState } from 'react';
import {Button, Modal} from 'antd';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Logo from "../../assets/logoBlack.png";
import {Link} from "react-router-dom";
import {RiHome2Line} from "react-icons/ri";
import {TiMessages} from "react-icons/ti";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {GrSchedule} from "react-icons/gr";
import {IoSettingsOutline} from "react-icons/io5";
import {FaRegQuestionCircle} from "react-icons/fa";
import {LuLogOut} from "react-icons/lu";
import AddCourse from "./AddCourse";
import AllCourseList from "./AllCourseList";

export default function CourseList() {
    const [activeComponent, setActiveComponent] = useState("courseList");
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);


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

                    <p className='text-3xl ml-4 mt-1 mb-0 greetingTag'><span className="text-danger">Course </span><span className="text-success"> Listing</span></p>
                    <p className='ml-4'>Here is your course listings.</p>

                    <div className='w-fit flex mx-4'>
                        <Button size='large' onClick={() => setIsAddModalVisible(true)}
                                className=' mr-2 mt-3 post-job-button' type="primary" danger block>
                            Post a Course
                        </Button>
                    </div>

                    <AllCourseList/>

                    <Modal
                        title="Add Course"
                        visible={isAddModalVisible}
                        onCancel={() => setIsAddModalVisible(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setIsAddModalVisible(false)}>
                                Cancel
                            </Button>
                        ]}
                    >
                        <AddCourse/>
                    </Modal>


                </Col>
            </Row>
        </Container>
    );
}