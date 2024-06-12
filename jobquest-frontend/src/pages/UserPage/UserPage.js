import React, {useState} from 'react';
import {Col, Container, Nav, Row} from 'react-bootstrap';
import "./UserPages.css";
import Logo from "../../assets/jobQuestLogo1.png";
import {IoHome, IoSettingsOutline} from "react-icons/io5";
import {TiMessages} from "react-icons/ti";
import {IoIosPaper} from "react-icons/io";
import {FaRegQuestionCircle, FaSearch, FaUser} from "react-icons/fa";
import {BsBuildings} from "react-icons/bs";
import UserDashboard from "../../components/UserComponents/UserDashboard/UserDashboard";
// import UserMessages from "../../components/UserComponents/UserMessages/UserMessages";
import UserProfile from "../../components/UserComponents/UserProfile/UserProfile";
import UserCourses from "../../components/UserComponents/UserCourses/UserCourses";
import UserJobs from "../../components/UserComponents/UserJobs/UserJobs";
import UserApplications from "../../components/UserComponents/UserApplications/UserApplications";
import UserHelp from "../../components/UserComponents/UserHelp";
import UserSettings from "../../components/UserComponents/UserProfile/UserSettings";
import {LuLogOut} from "react-icons/lu";
import {Link} from "react-router-dom";

export default function UserPage() {
    const [activeComponent, setActiveComponent] = useState("dashboard");

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Nav defaultActiveKey="/home" className="flex-column bg-light text-danger sidebar"
                         style={{minWidth: '250px', height: '100vh'}}>
                        <img src={Logo} alt="Logo" className="mt-3 mx-3 mb-3" style={{height: 'auto', width: '200px'}}/>

                        {/* Dashboard */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><IoHome className="text-danger mx-3"/></Col>
                            <Col xs={10}><Nav.Link className="text-danger"
                                                   onClick={() => setActiveComponent("dashboard")}>Dashboard</Nav.Link></Col>
                        </Row>

                        {/* Messages */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><TiMessages className="text-danger mx-3"/></Col>
                            <Col xs={10}>
                                <Nav.Link className="text-danger" onClick={() => window.location.href = 'http://localhost:3001/'}>
                                    Messages
                                </Nav.Link>
                            </Col>
                        </Row>


                        {/* My Applications */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><IoIosPaper className="text-danger mx-3"/></Col>
                            <Col xs={10}><Nav.Link className="text-danger"
                                                   onClick={() => setActiveComponent("applications")}>My
                                Applications</Nav.Link></Col>
                        </Row>

                        {/* Find Jobs */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><FaSearch className="text-danger mx-3"/></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("jobs")}>Find
                                Jobs</Nav.Link></Col>
                        </Row>

                        {/* Browse Courses */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><BsBuildings className="text-danger mx-3"/></Col>
                            <Col xs={10}><Nav.Link className="text-danger"
                                                   onClick={() => setActiveComponent("courses")}>Browse
                                Courses</Nav.Link></Col>
                        </Row>

                        {/* My Public Profile */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><FaUser className="text-danger mx-3"/></Col>
                            <Col xs={10}><Nav.Link className="text-danger"
                                                   onClick={() => setActiveComponent("profile")}>My Public
                                Profile</Nav.Link></Col>
                        </Row>

                        <hr className="border-dark mt-4 mb-4 w-75 align-self-center" />

                        {/* Help Center */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><FaRegQuestionCircle className="text-danger mx-3"/></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("help")}>Help
                                Center</Nav.Link></Col>
                        </Row>

                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><LuLogOut className="text-danger mx-3"/></Col>
                            <Col xs={10}><Link to="/" className="text-danger mx-3" onClick={localStorage.clear}>Log Out</Link></Col>
                        </Row>
                    </Nav>
                </Col>

                <Col md={10}>
                    {activeComponent === "dashboard" && <UserDashboard />}
                    {/*{activeComponent === "messages" && <UserMessages />}*/}
                    {activeComponent === "applications" && <UserApplications/>}
                    {activeComponent === "profile" && <UserProfile/>}
                    {activeComponent === "courses" && <UserCourses/>}
                    {activeComponent === "jobs" && <UserJobs/>}

                    {activeComponent === "help" && <UserHelp/>}

                </Col>
            </Row>
        </Container>
    );
}
