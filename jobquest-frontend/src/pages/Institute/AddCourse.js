import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [enrollmentCriteria, setEnrollmentCriteria] = useState('');
    const [content, setContent] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddContent = () => {
        setContent([...content, { topic: newTopic, url: newUrl }]);
        setNewTopic('');
        setNewUrl('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description || !syllabus || !enrollmentCriteria) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8070/api/institute/course', {
                title,
                description,
                syllabus,
                enrollmentCriteria,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            window.alert("Course added successfully");
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <>
                <div className="p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="text" className="form-control" value={title}
                                   onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <textarea className="form-control" value={description}
                                      onChange={(e) => setDescription(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Syllabus:</label>
                            <textarea className="form-control" value={syllabus}
                                      onChange={(e) => setSyllabus(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enrollment Criteria:</label>
                            <textarea className="form-control" value={enrollmentCriteria}
                                      onChange={(e) => setEnrollmentCriteria(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Content:</label>
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Topic"
                                           value={newTopic} onChange={(e) => setNewTopic(e.target.value)} required/>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="URL"
                                           value={newUrl} onChange={(e) => setNewUrl(e.target.value)} required/>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-primary" onClick={handleAddContent}>Add</button>
                                </div>
                            </div>
                            <div>
                                {content.map((item, index) => (
                                    <div key={index}>
                                        <p>{item.topic} - {item.url}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </div>
        </>
    );
};

export default AddCourse;
