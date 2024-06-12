import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import axios from "axios";


export default function CompanyProfile () {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userIdFromLocalStorage = localStorage.getItem('userId');
        if (userIdFromLocalStorage) {
            setUserId(userIdFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8070/api/company/profile/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });

                    if (response.status === 200) {
                        setUserData(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [userId]);


    return (
        <div>
            <div className="row justify-content-between align-content-between">
                <div className="col-9">
                    <p className="fs-3 mt-2 mb-2 mx-2">Dashboard</p>
                </div>
                <div className="col-3 float-end">
                    <button
                        className="border-dark bg-light mb-2 mx-2 text-danger mt-3 fw-bold"
                        style={{borderRadius: "10px"}}
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Back to Homepage
                    </button>
                </div>
            </div>

            <hr/>

            <div className="row">
                <div className="col-9">
                    <div className="row mx-1">
                        <div className="row bg-secondary-subtle" style={{height: "100px"}}></div>
                        <div className="row mt-3 border p-3">
                            <div className="col-1">
                                <CgProfile style={{fontSize: "50px"}}/>
                            </div>
                            <div className="col mx-4">
                                <h5 className="fs-3"><sapn className="text-danger">Company</sapn> <span className="text-success">Profile</span> </h5>
                                <h5 className="fs-3">
                                    {userData && (
                                        <>
                                            <p className="fs-6">{userData.userName}</p>
                                        </>
                                    )}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 border p-3">
                        <h3 className="fs-3">About Me</h3>
                        {userData && (
                            <>
                                <p className="fs-6">{userData.companyName}</p>
                                <p className="fs-6">{userData.email}</p>
                                <p className="fs-6">{userData.companyType}</p>
                                <p className="fs-6">{userData.description}</p>
                                <p className="fs-6">{userData.location}</p>
                                <p className="fs-6">{userData.industry}</p>
                            </>
                        )}
                    </div>

                    <div className="row mt-3 border p-3">
                        <h3 className="fs-3">Jobs</h3>
                        <div className="btn btn-outline-primary rounded-5 w-25 m-3">Software engineer</div>
                        <div className="btn btn-outline-primary rounded-5 w-25 m-3">Data scientist</div>
                        <div className="btn btn-outline-primary rounded-5 w-25 m-3">DevOps</div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="row mt-3 border p-3">
                        <div className="row mt-3 mb-3">
                            <div className="col-1 fs-4 mt-1 ">
                                <MdOutlineMailOutline/>
                            </div>
                            <div className="col fs-6 mx-3">{userData && (
                                <>
                                    <p className="fs-6">{userData.email}</p>
                                </>
                            )}</div>
                        </div>
                        <div className="row  mt-3 mb-3">
                            <div className="col-1 fs-4 mt-1 ">
                                <FaPhone/>
                            </div>
                            <div className="col fs-6 mx-3">Phone</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
