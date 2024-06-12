import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SlCalender} from "react-icons/sl";
import CanvasJSReact from '@canvasjs/react-charts';
import {SiRevolut} from "react-icons/si";
import UserCalendar from "./userCalender";
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EnrolledCourses from "../UserCourses/EnrolledCourses";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function UserDashboard() {
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [appliedCount, setAppliedCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    const openCalendarModal = () => {
        setShowCalendarModal(true);
    };

    const closeCalendarModal = () => {
        setShowCalendarModal(false);
    };

    useEffect(() => {
        fetchJobCounts();
    }, []);

    const fetchJobCounts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8070/api/user/dashboard/counts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {applied, accepted, rejected} = response.data;
            setAppliedCount(applied);
            setAcceptedCount(accepted);
            setRejectedCount(rejected);
        } catch (err) {
            console.error('Error fetching job counts:', err);
        }
    };

    const options = {
        animationEnabled: true,
        title: {
            text: ""
        },
        subtitles: [{
            text: "Status",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                {name: "Applied", y: appliedCount},
                {name: "Accepted", y: acceptedCount},
                {name: "Rejected", y: rejectedCount},
            ]
        }]
    };

    const navigateToHomePage = () => {
        window.location.href = '/';
    };


    return (
        <>
            <div className="row justify-content-between align-content-between">
                <div className="col-9">
                    <p className="fs-3 mt-2 mb-2 mx-2">Dashboard</p>
                </div>
                <div className="col-3 float-end ">
                    <button className="border-dark bg-light mb-2 mx-2 text-danger mt-3 fw-bold"
                            onClick={navigateToHomePage}>Back to Homepage
                    </button>
                </div>
            </div>

            <hr/>

            <div className="row justify-content-between align-content-between">
                <div className="col-10">
                    <p className="fs-3 mx-2">Good morning</p>
                    <div className="mx-2">Here is what’s happening with your job search applications.
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <center>
                        <div
                            className="row m-3 border border-dark shadow-lg p-3 mb-5 bg-white rounded position-relative">
                            <h3 className="text-dark-emphasis">Total Jobs Applied</h3>
                            <h1 className="display-4 fw-bold text-warning">{appliedCount}</h1>
                        </div>
                        <div
                            className="row m-3 border border-dark shadow-lg p-3 mb-5 bg-white rounded position-relative">
                            <h3 className="text-dark-emphasis">Total Jobs Accepted</h3>
                            <h1 className="display-4 fw-bold text-success">{acceptedCount}</h1>
                        </div>
                        <div
                            className="row m-3 border border-dark shadow-lg p-3 mb-5 bg-white rounded position-relative">
                            <h3 className="text-dark-emphasis">Total Jobs Rejected</h3>
                            <h1 className="display-4 fw-bold text-danger">{rejectedCount}</h1>
                        </div>
                    </center>
                </div>
                <div
                    className="col m-3 border-dark border border-dark-subtle shadow-lg p-3 mb-5 bg-white rounded">
                    <h3 className="text-dark-emphasis">Jobs Applied Status</h3>
                    <div>
                        <CanvasJSChart options={options}/>
                    </div>
                </div>
                <div
                    className="col m-3 border-dark border border-dark-subtle rounded shadow-lg p-3 mb-5 bg-white">
                    <h3 className="text-dark-emphasis">Schedule</h3>
                    <hr/>
                    <UserCalendar/>
                    <hr/>
                </div>
            </div>

            <hr/>

            <div className="row mt-5">
                <div className="col">
                    <EnrolledCourses/>
                </div>
            </div>


            {/* React-Bootstrap Modal */}
            <Modal show={showCalendarModal} onHide={closeCalendarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserCalendar/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCalendarModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
