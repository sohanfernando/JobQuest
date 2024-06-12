import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginAndSignin/Login";
import Signin from "./pages/LoginAndSignin/Signin";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import CompanyListPageAd from "./pages/Admin/CompanyListPage";
import CompanyListPage from "./pages/Company/CompanyListPage";
import InstituesListPage from "./pages/Admin/InstituesListPage";
import AdminSchedule from "./pages/Admin/AdminSchedule";
import EmployeeHome from "./pages/Employee/EmployeeHome";
import EmployeeAccountCreate from "./pages/Employee/EmployeeAccountCreate";
import EmAccountDetails from "./pages/Employee/EmAccountDetails";
import JobPosting from "./pages/Employee/JobPosting";
import JobList from "./pages/Company/JobList";
import AdminChat from "./pages/Admin/AdminChat";
import InstituteDash from "./pages/Institute/InstituteDash";
import InstituteSchedule from "./pages/Institute/InstituteSchedule";
import UserPage from "./pages/UserPage/UserPage";
import CompanyPage from "./pages/Company/CompanyPage";
import InstituteSignIn from "./pages/LoginAndSignin/InstituteSignIn";
import CompanySignIn from "./pages/LoginAndSignin/CompanySignIn";
import CourseList from "./pages/Institute/CourseList";
import AdminLogin from "./pages/LoginAndSignin/AdminLogin";
import AdminSettings from "./pages/Admin/AdminSettings";
import InstituteLogin from "./pages/LoginAndSignin/InstituteLogin";
import InstituteProfile from "./pages/Institute/InstituteProfile";
import Help from "./pages/Help";
import CompanyLogin from "./pages/LoginAndSignin/CompanyLogin";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/instituteLogin" element={<InstituteLogin />} />
                <Route path="/instituteProfile" element={<InstituteProfile />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/admin/dashboard" element={<AdminDashBoard />} />
                <Route path="/institute/dashboard" element={<InstituteDash />} />
                <Route path="/admin/companyList" element={<CompanyListPageAd />} />
                <Route path="/company/companyList" element={<CompanyListPage />} />
                <Route path="/institute/courseList" element={<CourseList />} />
                <Route path="/employee" element={<EmployeeHome />} />
                <Route path="/createAc" element={<EmployeeAccountCreate />} />
                <Route path="/acDetails" element={<EmAccountDetails />} />
                <Route path="/jobPost" element={<JobPosting />} />
                <Route path="/jobList" element={<JobList />} />
                <Route path="/adminChat" element={<AdminChat />} />
                <Route path="/institute/dashBoard" element={<InstituteDash />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/companylogin" element={<CompanyLogin />} />
                <Route path="/companySignIn" element={<CompanySignIn />} />
                <Route path="/instituteSignIn" element={<InstituteSignIn />} />
                <Route path="/admin/institutionList" element={<InstituesListPage />} />
                <Route path="/admin/mySchedule" element={<AdminSchedule />} />
                <Route path="/institute/mySchedule" element={<InstituteSchedule />} />


                <Route path="/help" element={<Help />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
