import {Col, Container, Nav, Row} from "react-bootstrap";
import Logo from "../../assets/logoBlack.png";
import {Link} from "react-router-dom";
import {RiHome2Line} from "react-icons/ri";
import {TiMessages} from "react-icons/ti";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {PiUsersThree} from "react-icons/pi";
import {GrSchedule} from "react-icons/gr";
import {IoSettingsOutline} from "react-icons/io5";
import {LuLogOut} from "react-icons/lu";
import React, {useState} from "react";
import AdminProfile from "./AdminProfile";

export default function AdminSettings() {
    const [activeComponent, setActiveComponent] = useState("dashboard");

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
                    <p className='text-3xl ml-4 mt-4 greetingTag'>Hello Admin.</p>
                    <p className='ml-4'>Here is your profile.</p>

                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <AdminProfile/>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                </Col>
            </Row>


        </Container>
    );
}