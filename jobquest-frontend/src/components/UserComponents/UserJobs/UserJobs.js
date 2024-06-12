import React, { useState, useEffect } from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const navigateToHomePage = () => {
    window.location.href = '/';
};

export default function UserJobs() {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [fullTimeChecked, setFullTimeChecked] = useState(false);
    const [partTimeChecked, setPartTimeChecked] = useState(false);
    const [remoteChecked, setRemoteChecked] = useState(false);
    const [contractChecked, setContractChecked] = useState(false);
    const [softwareChecked, setSoftwareChecked] = useState(false);
    const [fullstackChecked, setFullstackChecked] = useState(false);
    const [marketingChecked, setMarketingChecked] = useState(false);
    const [businessChecked, setBusinessChecked] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    const uploadFile = () => {
        if (!fileUpload) return Promise.reject("No file to upload");
        const fileRef = ref(storage, `/${fileUpload.name + v4()}`);
        return uploadBytes(fileRef, fileUpload)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                setFileUrl(url);
                return url;
            });
    };


    useEffect(() => {
        console.log("File URL: ", fileUrl);
    }, [fileUrl]);

    const openJobModal = (job) => {
        setSelectedJob(job);
        setShowJobModal(true);
    };

    const closeJobModal = () => {
        setShowJobModal(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleCvFileChange = (e) => {
        setFileUpload(e.target.files[0]);
    };

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get("http://localhost:8070/api/user/jobs", config);
            if (response.status === 200) {
                setJobs(response.data);
            } else {
                console.error('Failed to fetch jobs');
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleSearch = () => {
        const filteredJobs = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            job.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
        const typeOfEmploymentFilters = [
            fullTimeChecked && 'full time',
            partTimeChecked && 'part time',
            remoteChecked && 'remote',
            contractChecked && 'contract',
        ].filter(Boolean);
        const filteredByTypeOfEmployment = filteredJobs.filter(job =>
            typeOfEmploymentFilters.every(filter => job.description.toLowerCase().includes(filter))
        );
        const categoryFilters = [
            softwareChecked && 'software',
            fullstackChecked && 'fullstack',
            marketingChecked && 'marketing',
            businessChecked && 'business',
        ].filter(Boolean);
        const filteredByCategories = filteredByTypeOfEmployment.filter(job =>
            categoryFilters.every(filter => job.title.toLowerCase().includes(filter))
        );
        setJobs(filteredByCategories);
    };

    const handleShowAll = () => {
        setSearchTerm('');
        setSearchLocation('');
        setFullTimeChecked(false);
        setPartTimeChecked(false);
        setRemoteChecked(false);
        setContractChecked(false);
        setSoftwareChecked(false);
        setFullstackChecked(false);
        setMarketingChecked(false);
        setBusinessChecked(false);
        fetchJobs();
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const applyForJob = async () => {
        try {
            // Validate if a file is selected
            if (!fileUpload) {
                window.alert('Please select a file to upload.');
                return;
            }

            const fileUrl = await uploadFile();
            if (!fileUrl) {
                console.error('File URL is null');
                return;
            }

            const applicationData = {
                userId: localStorage.getItem('userId'),
                cvURL: fileUrl,
                applicationDate: new Date().toISOString(),
                status: 'pending'
            };

            const response = await axios.post(`http://localhost:8070/api/user/jobs/${selectedJob._id}/apply`, applicationData);
            if (response.status === 200) {
                console.log('Successfully applied for the job');
                window.alert('Application submitted successfully');
            } else {
                console.error('Failed to apply for the job');
                window.alert('Failed to apply for the job');
            }
        } catch (error) {
            console.error('Error applying for the job:', error);
        }
    };



    return (
        <div>
            <div className="row justify-content-between align-content-between">
                <div className="col-9">
                    <p className="fs-3 mt-2 mb-2 mx-2">Browse Jobs</p>
                </div>
                <div className="col-3 float-end">
                    <button className="border-dark bg-light mb-2 mx-2 text-danger mt-3 fw-bold float-end" onClick={navigateToHomePage}>Back to Homepage</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-1">
                            <CiSearch className="fs-3 mt-1"/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control mx-0.5" placeholder="Search Job" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-1">
                            <CiLocationOn className="fs-3 mt-1"/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control mx-0.5" placeholder="Search by Location" value={searchLocation} onChange={e => setSearchLocation(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <button className="btn btn-danger" onClick={handleSearch}>Search</button>
                    <button className="btn btn-secondary ms-2" onClick={handleShowAll}>Show All</button>
                </div>
            </div>
            <hr className="mt-4 mb-4"/>
            <div className="row">
                <div className="col-2">
                    <h5>Type of Employment</h5>
                    <br/>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={fullTimeChecked} onChange={e => setFullTimeChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Full time</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={partTimeChecked} onChange={e => setPartTimeChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Part time</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={remoteChecked} onChange={e => setRemoteChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Remote</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={contractChecked} onChange={e => setContractChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Contract</div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <h5>Categories</h5>
                    <br/>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={softwareChecked} onChange={e => setSoftwareChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Software</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={fullstackChecked} onChange={e => setFullstackChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Fullstack</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={marketingChecked} onChange={e => setMarketingChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Marketing</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" checked={businessChecked} onChange={e => setBusinessChecked(e.target.checked)}/>
                        </div>
                        <div className="col">
                            <div>Business</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <h1>All <span style={{color: '#FA5800'}}>Jobs</span></h1>
                    <div>Showing results</div>
                    <hr/>
                    <div className="row mt-5" style={{marginRight: '80px'}}>
                        {jobs.map(job => (
                            <div key={job._id} className="col-6 mb-3"  onClick={() => openJobModal(job)}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{job.title}</h5>
                                        <p className="card-text">{job.description}</p>
                                        <p className="card-text"><strong>Location:</strong> {job.location}</p>
                                        <p className="card-text"><strong>Posted Time:</strong> {formatDate(job.timestamp)}</p>
                                        <Button variant="primary" >Get more Details</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* React-Bootstrap Modal */}
            <Modal show={showJobModal} onHide={closeJobModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Job Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedJob && (
                        <div>
                            <h5>{selectedJob.title}</h5>
                            <p><strong>Description:</strong> {selectedJob.description}</p>
                            <p><strong>Location:</strong> {selectedJob.location}</p>
                            <p><strong>Type of Industry:</strong> {selectedJob.industry}</p>
                            <p><strong>Time:</strong> {formatDate(selectedJob.timestamp)}</p>
                            <div className="mb-3">
                                <label htmlFor="cvFile" className="form-label">Upload CV:</label>
                                <input type="file" className="form-control" id="cvFile" onChange={handleCvFileChange}/>
                            </div>
                            <Button variant="success" disabled={!fileUpload} onClick={applyForJob}>
                                Apply for Job
                            </Button>
                            {!fileUpload && <p className="text-danger mt-2">Please select a file to upload.</p>}

                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeJobModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
