// UserCourses.js
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CiSearch} from "react-icons/ci";
import {Button, Modal} from "react-bootstrap";

const navigateToHomePage = () => {
    window.location.href = '/';
};

export default function UserCourses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8070/api/user/courses/all");
            setCourses(response.data);
            setFilteredCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSearch = () => {
        const filtered = courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredCourses(filtered);
    };

    const handleReset = () => {
        setSearchQuery('');
        setFilteredCourses(courses);
    };

    const handleCardClick = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    const handleEnroll = async () => {
        try {
            await axios.post(`http://localhost:8070/api/user/courses/${selectedCourse._id}/enroll`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Enrolled in course successfully');
            setSelectedCourse(null);
            fetchCourses();
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    };

    return (
        <div className="mt-4">
            <h1 className="mb-4"><span className="text-danger">Available </span> <span
                className="text-success"> Courses</span></h1>
            <center>
                <div className="d-flex align-items-center mb-3 w-50">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-primary me-2" onClick={handleSearch}>
                        <CiSearch/>
                    </button>
                    <button className="btn btn-secondary" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </center>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredCourses.map((course) => (
                    <div key={course._id} className="col">
                        <div className="card h-100" onClick={() => handleCardClick(course)}>
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for displaying course details */}
            <Modal show={selectedCourse !== null} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCourse && (
                        <div>
                            <h2>{selectedCourse.title}</h2>
                            <p>Description: {selectedCourse.description}</p>
                            <p>Syllabus: {selectedCourse.syllabus}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleEnroll}>
                        Enroll
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {CiLocationOn, CiSearch} from "react-icons/ci";
// import {FaUserGraduate} from "react-icons/fa";
// import {Button, Modal} from "react-bootstrap";
//
// const navigateToHomePage = () => {
//     window.location.href = '/';
// };
//
// export default function UserCourses() {
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//
//     useEffect(() => {
//         async function fetchCourses() {
//             try {
//                 const response = await axios.get("http://localhost:8070/api/user/courses/all");
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         }
//
//         fetchCourses();
//     }, []);
//
//     const handleCardClick = (course) => {
//         setSelectedCourse(course);
//     };
//
//     const handleCloseModal = () => {
//         setSelectedCourse(null);
//     };
//
//     const handleEnroll = async (courseId) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 console.error("No token found. User not authenticated.");
//                 return;
//             }
//
//             const response = await axios.post(`http://localhost:8070/api/user/courses/${courseId}/enroll`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             console.log(response.data);
//             alert("Enrolled in course successfully!");
//         } catch (error) {
//             console.error("Error enrolling in course:", error);
//         }
//     };
//
//
//     return (
//         <div>
//             <div className="row justify-content-between align-content-between">
//                 <div className="col-9">
//                     <p className="fs-3 mt-2 mb-2 mx-2">Browse Courses</p>
//                 </div>
//                 <div className="col-3 float-end ">
//                     <button className="border-dark bg-light mb-2 mx-2 text-danger mt-3 fw-bold"
//                             onClick={navigateToHomePage}>Back to Homepage
//                     </button>
//                 </div>
//             </div>
//
//             <div className="row ">
//                 <div className="col">
//                     <div className="row ">
//                         <div className="col-1">
//                             <CiSearch className="fs-3 mt-1"/>
//                         </div>
//                         <div className="col">
//                             <input type="text" className="form-control mx-0.5" placeholder="Search Course"/>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col">
//                     <button className="btn btn-outline-success">Search</button>
//                 </div>
//                 <div className="col">
//                     <button className="btn btn-outline-dark">Reset</button>
//                 </div>
//             </div>
//
//             <hr className="mt-4 mb-4"/>
//
//             <div className="row">
//                 <div className="col">
//                     <h1><span className="text-danger">All</span> <span className="text-success">Courses</span></h1>
//                     <div>Showing {courses.length} results</div>
//                     <hr/>
//                 </div>
//             </div>
//
//             {courses.map(course => (
//                 <div key={course._id} className="row mt-5 justify-content-center" style={{marginRight: '80px'}}
//                      onClick={() => handleCardClick(course)}>
//                     <div className="col card category-card m-3" style={{backgroundColor: "white"}}>
//                         <div className="row">
//                             <div className="col-1 mx-4">
//                                 <FaUserGraduate style={{fontSize: '50px', marginTop: '30px'}}/>
//                             </div>
//                             <div className="col text-dark mx-3">
//                                 <div className="mt-3 fs-2 fw-bold">{course.title}</div>
//                                 <p className="fs-3">{course.institute}</p>
//                                 <div className="row mb-4">
//                                     <p>{course.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//
//             {/* Modal */}
//             <Modal show={selectedCourse !== null} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{selectedCourse && selectedCourse.title}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>{selectedCourse && selectedCourse.description}</p>
//                     <p>Description: {selectedCourse && selectedCourse.description}</p>
//                     <p>Syllabus: {selectedCourse && selectedCourse.syllabus}</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="primary"
//                             onClick={() => handleEnroll(selectedCourse && selectedCourse._id)}>Enroll</Button>
//                     <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// }