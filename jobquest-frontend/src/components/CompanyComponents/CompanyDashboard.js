import {IoIosNotificationsOutline, IoLogoDesignernews} from "react-icons/io";
import React, { useState, useEffect } from "react";
import {HiMiniBuildingOffice2} from "react-icons/hi2";
import CanvasJSReact from '@canvasjs/react-charts';
import {SiRevolut} from "react-icons/si";
import {FaDropbox} from "react-icons/fa";
import {TbCircleLetterP} from "react-icons/tb";
import axios from 'axios';

const navigateToHomePage = () => {
    window.location.href = '/';
};

export default function CompanyDashboard() {
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [counts, setCounts] = useState({ pending: 0, accept: 0, reject: 0 });
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userId');
        if (userIdFromLocalStorage) {
            setUserId(userIdFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchJobs();
            fetchApplications();
        }
    }, [userId]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/company/getAllJobs/${userId}`);
            setJobs(response.data);
            countStatus(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/company/applications/${userId}`);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const countStatus = (jobsData) => {
        let pendingCount = 0;
        let acceptCount = 0;
        let rejectCount = 0;

        jobsData.forEach(job => {
            job.applicants.forEach(applicant => {
                switch (applicant.status) {
                    case 'pending':
                        pendingCount++;
                        break;
                    case 'accepted':
                        acceptCount++;
                        break;
                    case 'rejected':
                        rejectCount++;
                        break;
                    default:
                        break;
                }
            });
        });

        setCounts({ pending: pendingCount, accept: acceptCount, reject: rejectCount });
    };

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: ""
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                {x: 50, y: 71},
                {x: 60, y: 68},
                {x: 70, y: 38},
                {x: 80, y: 92, indexLabel: "Highest"},
                {x: 90, y: 54},
            ]
        }]
    };

    return (
        <>
            <div className="row justify-content-between align-content-between">
                <div className="col-9">
                    <div className="row">
                        <div className="col-1 mt-3">
                            <center>
                                <HiMiniBuildingOffice2 className="fs-1 text-success mx-3 mb-2"/>
                            </center>
                        </div>
                        <div className="col">
                            <div className="row ">Company</div>
                            <div className="row fs-3 fw-bold">Dashboard</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 float-end ">
                    <button className="border-dark bg-light mb-2 mx-2 text-danger mt-3 fw-bold"
                            onClick={navigateToHomePage}>Back to Homepage
                    </button>
                    <IoIosNotificationsOutline className="mx-3" style={{fontSize: '25px'}}/>
                </div>
            </div>

            <hr/>

            <div className="row mx-3">
                <p className="fw-bold fs-4">Hello</p>
                <span>Here is your job listings statistic report.</span>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="col">
                        <div className="card">
                            <div className="card-body bg-lime-400">
                                <h5 className="card-title">Total Job Listings</h5>
                                <p className="card-text text-center fs-1">{jobs.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="col">
                        <div className="card">
                            <div className="card-body bg-fuchsia-600">
                                <h5 className="card-title">Total Job Applications</h5>
                                <p className="card-text text-center fs-1">{applications.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <center>
            <div className="row mt-5 mx-3">
                <div className="col">
                    <div className="row">
                        {/* <div className="col-8">
                            <div className="fs-3 fw-bold">Job statistics</div>
                            <CanvasJSChart options={options}/>
                        </div> */}
                        <div className="col">
                            <div className="card mt-5">
                                <div className="card-body">
                                    <h5 className="card-title">Pending</h5>
                                    <p className="card-text text-center fs-1">{counts.pending}</p>
                                </div>
                            </div>
                            <div className="card mt-5">
                                <div className="card-body">
                                    <h5 className="card-title">Rejected</h5>
                                    <p className="card-text text-center fs-1">{counts.reject}</p>
                                </div>
                            </div>
                       
                      

                        </div>
                    </div>
                </div>
                <div className="col">

                    <div className="row">
                        <div className="card m-5">
                            <div className="card-body">
                                <h5 className="card-title">Total Applied</h5>
                                <p className="card-text text-center fs-1">{applications.length}</p>
                                <center>
                                    Pending: {counts.pending}<br/>
                                    Rejected: {counts.reject}<br/>
                                    Approved: {counts.accept}
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </center>

           
        
        
        </>
    );
}
