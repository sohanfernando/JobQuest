import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import "../Admin/AdminDashBoard.css";
import Logo from "../../assets/logoBlack.png";
import {IoSettingsOutline} from "react-icons/io5";
import {TiMessages} from "react-icons/ti";
import {FaRegQuestionCircle} from "react-icons/fa";
import {RiHome2Line} from "react-icons/ri";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {PiUsersThree} from "react-icons/pi";
import {GrSchedule} from "react-icons/gr";
import {Button, Space, Table, Tag} from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import {LuLogOut} from "react-icons/lu";
import {Link} from "react-router-dom";


export default function CompanyListPage() {
    const [activeComponent, setActiveComponent] = useState("companyList");
    const user={
        name:'Jason'
    }

    const data = [
        {
            key: '1',
            roles: 'John',
            datePostes: 'Brown',
            dueDate: '2000-34-45',
            action: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            roles: 'John',
            datePostes: 'Brown',
            dueDate: '2000-34-45',
            action: 'New York No. 1 Lake Park',
        },
        {
            key: '3',
            roles: 'John',
            datePostes: 'Brown',
            dueDate: '2000-34-45',
            action: 'New York No. 1 Lake Park',
        },
        {
            key: '4',
            roles: 'John',
            datePostes: 'Brown',
            dueDate: '2000-34-45',
            action: 'New York No. 1 Lake Park',
        },
        {
            key: '5',
            roles: 'John',
            datePostes: 'Brown',
            dueDate: '2000-34-45',
            action: 'New York No. 1 Lake Park',
        },
    ];

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Nav defaultActiveKey="/home" className="flex-column bg-light text-white sidebar" style={{minWidth: '250px', height: '100vh'}}>
                        <img src={Logo} alt="Logo" className="mt-3 mx-3 mb-3" style={{height: 'auto', width: '200px'}}/>
                        <Nav.Link onClick={() => setActiveComponent("dashboard")}  className={`sidebar-text custom-nav-link ${activeComponent === "dashboard" ? "active" : ""}`}><span className="icon-margin"><RiHome2Line /></span> <span>Dashboard</span></Nav.Link>
                        {/* Messages */}
                        <Row className="sidebar-text align-items-center">
                            <Col xs={2}><TiMessages className="text-danger mx-3"/></Col>
                            <Col xs={10}>
                                <Nav.Link className="text-danger" onClick={() => window.location.href = 'http://localhost:3001/'}>
                                    Messages
                                </Nav.Link>
                            </Col>
                        </Row>
                        <Nav.Link onClick={() => setActiveComponent("companyList")}  className={`sidebar-text custom-nav-link ${activeComponent === "companyList" ? "active" : ""}`}><span className="icon-margin"><HiOutlineBuildingOffice2 /></span> Company List</Nav.Link>
                        <Nav.Link onClick={() => setActiveComponent("institute")}  className={`sidebar-text custom-nav-link ${activeComponent === "institute" ? "active" : ""}`}><span className="icon-margin"><PiUsersThree /></span>Institute List</Nav.Link>
                        <Nav.Link onClick={() => setActiveComponent("schedule")}  className={`sidebar-text custom-nav-link ${activeComponent === "schedule" ? "active" : ""}`}><span className="icon-margin"><GrSchedule /></span>My Schedule</Nav.Link>
                        <hr className="border-dark mt-4 mb-4 w-75 align-self-center" />
                        <p className="text-uppercase mx-4" style={{color:"#747474"}}> Settings </p>
                        <Nav.Link onClick={() => setActiveComponent("settings")} className="sidebar-text custom-nav-link"><span className="icon-margin"><IoSettingsOutline /></span> Settings</Nav.Link>
                        <Nav.Link onClick={() => setActiveComponent("help")} className="sidebar-text custom-nav-link"><span className="icon-margin"><FaRegQuestionCircle /> </span>Help Center</Nav.Link>
                        <Link to="/" onClick={() => setActiveComponent("schedule")}
                              className={`sidebar-text custom-nav-link ${activeComponent === "schedule" ? "nActive" : ""}`}>
                            <span className="icon-margin"><LuLogOut /></span>
                            <span>LogOut</span>
                        </Link>
                    </Nav>
                </Col>
                <Col md={10}>
                    <p className='text-3xl ml-4 mt-4 mb-0 greetingTag'>Good morning, {user.name}</p>
                    <p className='ml-4'>Here is your job listings statistic report from July 19 - July 25.</p>
                    <Table dataSource={data} className='m-3'>
                        <ColumnGroup title="Company List">
                        <Column title="Roles" dataIndex="roles" key="roles" />
                        <Column title="Date Posted" dataIndex="datePostes" key="datePosted" />
                        <Column title="Due Date" dataIndex="dueDate" key="dueDate" />
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button danger>Edit</Button>
                                    </Space>
                                )}
                            />

                        </ColumnGroup>
                    </Table>

                </Col>
            </Row>
        </Container>
    );
}