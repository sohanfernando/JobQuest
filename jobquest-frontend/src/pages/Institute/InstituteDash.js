import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Col, Container, Nav, Row} from 'react-bootstrap';
import "./InstituteDash.css";
import {Alert, List} from 'antd';
import Logo from "../../assets/logoBlack.png";
import {IoSettingsOutline} from "react-icons/io5";
import {TiMessages} from "react-icons/ti";
import {FaRegQuestionCircle, FaUserGraduate} from "react-icons/fa";
import {RiHome2Line} from "react-icons/ri";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {GrSchedule} from "react-icons/gr";
import {Link} from "react-router-dom";
import {LuLogOut} from "react-icons/lu";

const InstituteDash = () => {
    const [activeComponent, setActiveComponent] = useState("dashboard");
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [courseCount, setCourseCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/institute/featured-courses');
                setFeaturedCourses(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch featured courses.');
                console.error('Fetch Featured Courses Error:', err);
            }
        };

        fetchFeaturedCourses();
    }, []);

    useEffect(() => {
        const fetchCourseCount = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/institute/getAllCourses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCourseCount(response.data.length);
            } catch (err) {
                console.error('Error fetching course count:', err);
            }
        };

        fetchCourseCount();
    }, []);

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
                    <p className='text-3xl ml-4 mt-4 mb-0 greetingTag'>Hello..</p>
                    <p className='ml-4'>Here is your listings statistic report.</p>

                    <center>
                    <div className="box green w-75 m-5 p-5 text-center text-light fw-bold">
                        <h3>Total Courses : {courseCount}</h3>
                    </div>
                    </center>

                    <div className="border p-4 rounded-3 bg-light shadow-lg mx-5 ml-5 pb-5">
                        <center>
                            <h3 className="mt-3 mx-3 underline">Featured <span className="text-danger">Courses</span>
                            </h3>
                            {error ? (
                                <Alert className="error-message" type="error" message={error}/>
                            ) : (

                                <List
                                    className="w-75"
                                    dataSource={featuredCourses}
                                    renderItem={course => (
                                        <List.Item key={course._id}
                                                   className="border shadow-xl mt-3 mx-5 ml-5 p-3 rounded">
                                            <FaUserGraduate className="fs-3 text-success "/><h4>{course.title}</h4>
                                        </List.Item>
                                    )}
                                />

                            )}
                        </center>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default InstituteDash;
