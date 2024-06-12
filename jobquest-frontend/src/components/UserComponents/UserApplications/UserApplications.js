import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillBuildingsFill, BsTrash } from 'react-icons/bs';
import { Tab, Nav } from 'react-bootstrap';
import {MdEngineering} from "react-icons/md";
import {PiSmileySadLight} from "react-icons/pi";

const UserApplications = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [acceptedJobs, setAcceptedJobs] = useState([]);
    const [rejectedJobs, setRejectedJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppliedJobs();
        fetchAcceptedJobs();
        fetchRejectedJobs();
    }, []);

    const fetchAppliedJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8070/api/user/jobs/applied', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAppliedJobs(response.data);
        } catch (err) {
            setError(err.response.data);
        }
    };

    const fetchAcceptedJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8070/api/user/jobs/accepted', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAcceptedJobs(response.data);
        } catch (err) {
            setError(err.response.data);
        }
    };

    const fetchRejectedJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8070/api/user/jobs/rejected', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRejectedJobs(response.data);
        } catch (err) {
            setError(err.response.data);
        }
    };

    const handleDeleteApplication = async (jobId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8070/api/user/jobs/${jobId}/application`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAppliedJobs(prevAppliedJobs => prevAppliedJobs.filter(job => job._id !== jobId));
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className=" mt-5">
            <h2 className="mb-4 text-center text-success">Your <span className="text-danger">Applications</span></h2>
            <Tab.Container defaultActiveKey="applied">
                <Nav variant="tabs" className="justify-content-center mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="applied">Applied</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="accepted">Accepted</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="rejected">Rejected</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="applied">
                        {appliedJobs.map(job => (
                            <div key={job._id} className="card mb-4 ">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <MdEngineering className="text-primary me-2" style={{ fontSize: '2rem' }} />
                                        <div>
                                            <h5 className="card-title mb-1">{job.title}</h5>
                                        </div>
                                    </div>
                                    <p className="card-text mb-3">{job.description}</p>
                                    <p className="card-text mb-0"><strong>Status:</strong><span
                                        className="btn btn-warning rounded-5 p-2 mx-4"> Pending</span></p>
                                    <button className="btn btn-danger mt-3 " onClick={() => handleDeleteApplication(job._id)}>
                                        Delete Application
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="accepted">
                        {acceptedJobs.map(job => (
                            <div key={job._id} className="card mb-4">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <BsFillBuildingsFill className="text-primary me-2" style={{ fontSize: '2rem' }} />
                                        <div>
                                            <h5 className="card-title mb-1">{job.title}</h5>
                                        </div>
                                    </div>
                                    <p className="card-text mb-3">{job.description}</p>
                                    <p className="card-text mb-0"><strong>Status:</strong><span
                                        className="btn btn-success rounded-5 p-2 mx-4"> Accepted </span></p>
                                </div>
                            </div>
                        ))}
                    </Tab.Pane>

                    <Tab.Pane eventKey="rejected">
                        {rejectedJobs.map(job => (
                            <div key={job._id} className="card mb-4">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <PiSmileySadLight className="text-primary me-2" style={{ fontSize: '2rem' }} />
                                        <div>
                                            <h5 className="card-title mb-1">{job.title}
                                            </h5>
                                        </div>
                                    </div>
                                    <p className="card-text mb-3">{job.description}</p>
                                    <p className="card-text mb-0"><strong>Status:</strong><span className="btn btn-danger rounded-5 p-2 mx-4"> Rejected </span></p>
                                </div>
                            </div>
                        ))}
                    </Tab.Pane>

                </Tab.Content>
            </Tab.Container>
            {error && <p className="text-danger mt-4">{error}</p>}
        </div>
    );
};

export default UserApplications;
