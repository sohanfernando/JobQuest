import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

const navigateToHomePage = () => {
    window.location.href = '/';
};

export default function CompanyApplications() {
    const [applications, setApplications] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userId');
        if (userIdFromLocalStorage) {
            setUserId(userIdFromLocalStorage);
            fetchApplications(userIdFromLocalStorage);
        }
    }, []);

    const fetchApplications = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/company/applications/${userId}`);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const changeStatusacc = async (appId, newStatus) => {
        try {
            await axios.put(`http://localhost:8070/api/company/applicationsacc/${appId}`, { status: newStatus });
            fetchApplications(userId);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const changeStatusrej = async (appId, newStatus) => {
        try {
            await axios.put(`http://localhost:8070/api/company/applicationsrej/${appId}`, { status: newStatus });
            fetchApplications(userId);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const fetchUserNames = async (applications) => {
        const promises = applications.map(async (application) => {
            const userId = application.applicants[0]?.applicant;
            if (userId) {
                const response = await axios.get(`http://localhost:8070/api/company/userdata/${userId}`);
                return response.data.userName;
            } else {
                return 'Unknown';
            }
        });
        return await Promise.all(promises);
    };

    useEffect(() => {
        if (applications.length > 0) {
            fetchUserNames(applications)
                .then(userNames => {
                    const updatedApplications = applications.map((application, index) => ({
                        ...application,
                        userName: userNames[index]
                    }));
                    setApplications(updatedApplications);
                })
                .catch(error => console.error('Error fetching user names:', error));
        }
    }, [applications]);


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
                    </div>
                </div>
                <div className="col-3 float-end ">
                    <div className="row">
                        <div className="col">
                            <button className="border-dark bg-light mb-2 mx-2 text-danger mt-3 fw-bold"
                                    onClick={navigateToHomePage}>Back to Homepage
                            </button>
                        </div>
                        <div className="col">
                            <IoIosNotificationsOutline className="mt-4" style={{fontSize: '25px'}}/>
                        </div>
                    </div>

                </div>
            </div>

            <hr/>

            <div className="row mx-3">
                <div className="col">
                    <p className="] fs-4">Total applicants : {applications.length}</p>
                </div>
                <div className="col"></div>
                <div className="col-4">
                    <input type="text" className="form-control" placeholder="Search by name"/>
                </div>
            </div>
           { console.log(applications)}
           {applications.map(application => (
               <div key={application._id} className="row mx-3 border rounded-5 p-2 mt-2">
                   <div className="col mt-1">
                       <CgProfile className="fs-2"/>
                   </div>
                   <div className="col">
                       <p className="fs-5">Applicant Name: <br/>{application.userName}</p>
                   </div>
                   <div className="col">
                       <p className="fs-5">Title: <br/>{application.title}</p>
                   </div>
                   <div className="col">
                       <p className="fs-5">Industry: <br/>{application.industry}</p>
                   </div>
                   <div className="col">
                       <p className="fs-5">Status: <br/>{application.applicants[0]?.status}</p>
                       {application.applicants[0]?.status === 'pending' && (
                           <button className="btn btn-sm btn-primary"
                                   onClick={() => changeStatusacc(application._id, 'accepted')}>Accept</button>
                       )}
                       {application.applicants[0]?.status === 'pending' && (
                           <button className="btn btn-sm btn-danger"
                                   onClick={() => changeStatusrej(application._id, 'rejected')}>Reject</button>
                       )}
                   </div>
               </div>
           ))}
        </>
    );
};


