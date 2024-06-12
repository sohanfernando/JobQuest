import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../../assets/jobQuestLogo1.png";
import {IoHome, IoSettingsOutline} from "react-icons/io5";
import {TiMessages} from "react-icons/ti";
import {FaRegQuestionCircle, FaWpforms} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {CiCircleList} from "react-icons/ci";
import {MdSchedule} from "react-icons/md";
import CompanyDashboard from "../../components/CompanyComponents/CompanyDashboard";
import CompanyMessages from "../../components/CompanyComponents/CompanyMessages";
import CompanyProfile from "../../components/CompanyComponents/CompanyProfile";
import CompanyApplications from "../../components/CompanyComponents/CompanyApplications";
import UpdateCompanyProfile from "../../components/CompanyComponents/UpdateCompanyProfile";

import CompanyListing from "../../components/CompanyComponents/CompanyListing";
import CompanyHelpCenter from "../../components/CompanyComponents/CompanyHelpCenter";
import CompanySchedule from "../../components/CompanyComponents/CompanySchedule";
import JobList from "../../pages/Company/JobList";
import {LuLogOut} from "react-icons/lu";
import {Link} from "react-router-dom";

export default function CompanyPage() {
    const [activeComponent, setActiveComponent] = useState("dashboard");

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Nav defaultActiveKey="/home" className="flex-column bg-light text-danger sidebar" style={{minWidth: '250px', height: '100vh'}}>
                        <img src={Logo} alt="Logo" className="mt-3 mx-3 mb-3" style={{height: 'auto', width: '200px'}}/>

                        {/* Dashboard */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><IoHome className="text-danger mx-3" /></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("dashboard")}>Dashboard</Nav.Link></Col>
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
                            <Col xs={2}><CgProfile className="text-danger mx-3" /></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("profile")}>Profile</Nav.Link></Col>
                        </Row>

                        {/* Find Jobs */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><FaWpforms className="text-danger mx-3" /></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("applications")}>Applications</Nav.Link></Col>
                        </Row>

                        {/* Browse Courses */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><CiCircleList className="text-danger mx-3" /></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("listing")}>Listing</Nav.Link></Col>
                        </Row>

                        {/* My Public Profile */}
                        {/* <Row className="sidebar-text align-items-center">
                            <Col xs={2}><MdSchedule className="text-danger mx-3" /></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("schedule")}>Schedule</Nav.Link></Col>
                        </Row> */}

                        <hr className="border-dark mt-4 mb-4 w-75 align-self-center" />

                        {/* Settings */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><IoSettingsOutline className="text-danger mx-3" /></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("settings")}>Settings</Nav.Link></Col>
                        </Row>

                        {/* Help Center */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><FaRegQuestionCircle className="text-danger mx-3" /></Col>
                            <Col xs={10}><Nav.Link className="text-danger" onClick={() => setActiveComponent("help")}>Help Center</Nav.Link></Col>
                        </Row>
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><LuLogOut className="text-danger mx-3"/></Col>
                            <Col xs={10}><Link to="/" className="text-danger mx-3" onClick={localStorage.clear}>Log Out</Link></Col>
                        </Row>
                    </Nav>
                </Col>

                <Col md={10}>
                    {activeComponent === "dashboard" && <CompanyDashboard />}
                    {activeComponent === "messages" && <CompanyMessages />}
                    {activeComponent === "profile" && <CompanyProfile />}
                    {activeComponent === "applications" && <CompanyApplications />}
                    {activeComponent === "listing" && <JobList />}
                    {/* {activeComponent === "schedule" && <CompanySchedule />} */}
                    {activeComponent === "settings" && <UpdateCompanyProfile />}
                    {activeComponent === "help" && <CompanyHelpCenter />}

                </Col>
            </Row>
        </Container>
    );
}
