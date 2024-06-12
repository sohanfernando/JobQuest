import React, { useState, useEffect } from 'react';
import { List, Card, Modal, Button, Popconfirm, message, Input } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const AllCourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateSyllabus, setUpdateSyllabus] = useState('');
    const [updateEnrollmentCriteria, setUpdateEnrollmentCriteria] = useState('');
    const [updateContent, setUpdateContent] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const [newUrl, setNewUrl] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/institute/getAllCourses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching courses.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleUpdateModal = (course) => {
        setSelectedCourse(course);
        setUpdateTitle(course.title);
        setUpdateDescription(course.description);
        setUpdateSyllabus(course.syllabus);
        setUpdateEnrollmentCriteria(course.enrollmentCriteria);
        setUpdateContent(course.content);
        setUpdateModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8070/api/institute/courses/${selectedCourse._id}`, {
                title: updateTitle,
                description: updateDescription,
                syllabus: updateSyllabus,
                enrollmentCriteria: updateEnrollmentCriteria,
                content: updateContent
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            message.success('Course updated successfully');
            setUpdateModalVisible(false);
        } catch (err) {
            message.error('Failed to update course');
        }
    };

    const handleAddContent = () => {
        setUpdateContent([...updateContent, { topic: newTopic, url: newUrl }]);
        setNewTopic('');
        setNewUrl('');
    };

    const handleDeleteContent = (index) => {
        const updatedContent = updateContent.filter((item, i) => i !== index);
        setUpdateContent(updatedContent);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/api/institute/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            message.success('Course deleted successfully');
            const updatedCourses = courses.filter(course => course._id !== id);
            setCourses(updatedCourses);
        } catch (err) {
            message.error('Failed to delete course');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={courses}
                    renderItem={course => (
                        <List.Item>
                            <Card
                                title={course.title}
                                extra={
                                    <>
                                        <Button className="btn btn-outline-primary" onClick={() => handleUpdateModal(course)}>Update</Button>
                                        <Popconfirm
                                            title="Are you sure to delete this course?"
                                            onConfirm={() => handleDelete(course._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button className="btn btn-outline-danger" style={{ marginLeft: '8px' }}>Delete</Button>
                                        </Popconfirm>
                                    </>
                                }
                            >
                                <p>{course.description}</p>
                                <p>Syllabus: {course.syllabus}</p>
                                <p>Enrollment Criteria: {course.enrollmentCriteria}</p>
                                <ul className="list-group">
                                    {course.content.map((item, i) => (
                                        <li key={i} className="list-group-item">
                                            {item.topic} : {item.url}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </List.Item>
                    )}
                />
            )}

            {/* Update Course Modal */}
            <Modal
                title="Update Course"
                visible={updateModalVisible}
                onCancel={() => setUpdateModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setUpdateModalVisible(false)}>Cancel</Button>,
                    <Button key="update" className="btn btn-outline-success" onClick={handleUpdate}>Update</Button>
                ]}
            >
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <TextArea
                        value={updateDescription}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Syllabus:</label>
                    <TextArea
                        value={updateSyllabus}
                        onChange={(e) => setUpdateSyllabus(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Enrollment Criteria:</label>
                    <TextArea
                        value={updateEnrollmentCriteria}
                        onChange={(e) => setUpdateEnrollmentCriteria(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content:</label>
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Topic"
                                value={newTopic}
                                onChange={(e) => setNewTopic(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="URL"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary" onClick={handleAddContent}>Add Content</button>
                        </div>
                    </div>
                    <div>
                        {updateContent.map((item, index) => (
                            <div key={index}>
                                <p>{item.topic} : {item.url}</p>
                                <Button className="btn btn-outline-danger" danger onClick={() => handleDeleteContent(index)}>Delete</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AllCourseList;
