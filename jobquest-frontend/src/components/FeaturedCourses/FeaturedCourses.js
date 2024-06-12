import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import {PiStudentFill} from "react-icons/pi";

export default function FeaturedCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get("http://localhost:8070/api/user/courses/all");
                setCourses(response.data.slice(0, 4)); // Only first 4 courses
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
        fetchCourses();
    }, []);

    return (
        <div style={{ color: '#251E1E', marginLeft: '100px', height: '100vh', marginTop: '100px' }} className="mb-5">
            <div className="row align-items-center">
                <div className="col">
                    <div style={{ color: "white", fontSize: '40px', display: 'inline' }}>Featured</div>
                    <div style={{ color: "red", fontSize: '40px', display: 'inline' }}> Courses</div>
                </div>
                <div className="col text-right">
                    <span style={{ marginTop: '20px', marginBottom: '0px' }}>
                        <Link to="/" className="nav-link mx-0.5" style={{
                            color: "red",
                            marginRight: '100px',
                            fontSize: "large",
                            marginTop: '20px'
                        }}>Show all Jobs   <FaArrowRight className="float-end mt-1" /></Link>
                    </span>
                </div>
            </div>

            <div className="row mt-5 justify-content-center" style={{ marginRight: '80px' }}>
                {courses.map(course => (
                    <a key={course._id} href="/login" className="col-5 card category-card m-3" style={{ backgroundColor: "white", color: "black", textDecoration: 'none' }}>
                        <div className="row">
                            <div className="col-2 mx-4">
                                <PiStudentFill className="" style={{fontSize:'100px', marginTop:'40px'}}/>
                            </div>
                            <div className="col-6 text-dark mx-3">
                                <div className="mt-5 fs-2 fw-bold">{course.title}</div>
                                <p className="fs-4">{course.institute.name}</p>
                                <p className="fs-4">{course.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
