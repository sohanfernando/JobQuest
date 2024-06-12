import React, { useState } from "react";
import Login from "./Login";
import CompanyLogin from "./CompanyLogin";
import InstituteLogin from "./InstituteLogin";
import AdminLogin from "./AdminLogin";

export default function LoginNav() {
    const [activeTab, setActiveTab] = useState('Job Seeker');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-transparent">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className={`nav-link ${activeTab === 'Job Seeker' ? 'active' : ''}`} onClick={() => handleTabClick('Job Seeker')}>Job Seeker</div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link ${activeTab === 'Company' ? 'active' : ''}`} onClick={() => handleTabClick('Company')}>Company</div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link ${activeTab === 'Institute' ? 'active' : ''}`} onClick={() => handleTabClick('Institute')}>Institute</div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link ${activeTab === 'Admin' ? 'active' : ''}`} onClick={() => handleTabClick('Admin')}>Admin</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mt-3">
                {activeTab === 'Job Seeker' && <Login />}
                {activeTab === 'Company' && <CompanyLogin />}
                {activeTab === 'Institute' && <InstituteLogin />}
                {activeTab === 'Admin' && <AdminLogin />}
            </div>
        </div>
    );
}
