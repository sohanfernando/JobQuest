import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import axios from "axios";

const navigateToHomePage = () => {
    window.location.href = '/';
};

const CompanyListing = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('/api/company/getAllJobsByCompany/' + localStorage.getItem('userId'))
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Industry',
            dataIndex: 'industry',
            key: 'industry',
        },
    ];

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
                            <div className="row fs-3 fw-bold">Nomad</div>
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
                <p className=" fs-4">Total applicants : 15</p>
            </div>

            <hr/>

            <div className="row mx-3">
                <p className=" fs-4">Job Information</p>
            </div>

            <hr/>

            {/* Ant Design Table to display jobs */}
            <div className="row mx-3">
                <Table dataSource={jobs} columns={columns} />
            </div>
        </>
    );
};

export default CompanyListing;
