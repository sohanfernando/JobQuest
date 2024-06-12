import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Card } from 'react-bootstrap';

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/user/courses/enrolled', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setEnrolledCourses(response.data);

            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };

        fetchEnrolledCourses();
    }, []);

    const handleOpenModal = (course) => {
        setSelectedCourse(course);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleUnenroll = async () => {
        try {
            await axios.post(`http://localhost:8070/api/user/courses/${selectedCourse._id}/unenroll`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Unenrolled from course successfully');
            const updatedCourses = enrolledCourses.filter(course => course._id !== selectedCourse._id);
            setEnrolledCourses(updatedCourses);
            setShowModal(false);
        } catch (error) {
            console.error('Error unenrolling from course:', error);
        }
    };

    return (
        <div className="mt-3 mb-4">
            <h2 className="mb-4">Enrolled Courses</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {enrolledCourses.map(course => (
                    <div key={course._id} className="col">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title className="fs-2">{course.title}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <center><Button variant="success" className="rounded-5" onClick={() => handleOpenModal(course)}>View Details</Button></center>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCourse && (
                        <div>
                            <h2>{selectedCourse.title}</h2>
                            <p>Description: {selectedCourse.description}</p>
                            <h4>Course Content:</h4>
                            <ul className="list-group">
                                {selectedCourse.content.map((item, i) => (
                                    <li key={i} className="list-group-item">
                                        {item.topic} : {item.url}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleUnenroll}>Unenroll</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EnrolledCourses;
