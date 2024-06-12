import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FeaturedJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/api/user/jobs/all")
            .then(response => {
                const limitedJobs = response.data.slice(0, 8);
                setJobs(limitedJobs);
            })
            .catch(error => {
                console.error("Error fetching jobs:", error);
            });
    }, []);

    return (
        <div style={{ color: "#251E1E", marginLeft: "100px", height: "100vh", marginTop: "100px" }}>
            <div className="row align-items-center">
                <div className="col">
                    <div style={{ color: "white", fontSize: "40px", display: "inline" }}>Featured</div>
                    <div style={{ color: "red", fontSize: "40px", display: "inline" }}> Jobs</div>
                </div>
                <div className="col text-right">
                    <span style={{ marginTop: "20px", marginBottom: "0px" }}>
                        <Link to="/" className="nav-link" style={{ color: "red", marginRight: "100px", fontSize: "large", marginTop: "20px" }}>
                            Show all Jobs <FaArrowRight className="float-end mt-1" />
                        </Link>
                    </span>
                </div>
            </div>

            <div className="row mt-5" style={{ marginRight: "80px" }}>
                {jobs.map(job => (
                    <div className="col-3 mt-2" key={job._id}>
                        <Link to="/login" className="underline-offset-0">
                            <div className="card category-card" style={{ width: "18rem", backgroundColor: "white", color: "black", cursor: "pointer" }}>
                                <div className="card-body">
                                    <div className="row align-content-between">
                                        {/* Render job details */}
                                        <div className="col">
                                            <button className="btn btn-outline-primary">Full Time</button>
                                        </div>
                                    </div>
                                    <div className="card-title fs-5 mt-2 mx-3 fw-bold">{job.title}</div>
                                    <p className="mx-3">{job.company} . {job.location}</p>
                                    <p className="mx-3">{job.description}</p>
                                    <div className="row mx-1">
                                        <div className="col">
                                            <button className="btn btn-warning rounded-5 text-white"><b>Apply</b></button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-success rounded-5 text-white"><b>More Details</b></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
