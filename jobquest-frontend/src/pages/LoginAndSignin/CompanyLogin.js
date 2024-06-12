import React from "react";
import logo from "../../assets/logoBlack.png";
import Man from "../../assets/bsMan.png";
import anny from "../../assets/annaliticsimg.png";
import conten from "../../assets/frontContent.png";
import './Login.css'
import GoogleButton from "react-google-button";
import {Button, Checkbox, Flex, Input, Typography,message} from 'antd';
import {Link, useNavigate} from "react-router-dom";

import axios from "axios"; 
import { useState } from "react";

export default function CompanyLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate();

    const navTosignIn=()=>{
        navigate('/signin');
    }

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8070/api/company/login", {
                email: email,
                password: password
            });

            if (response.status === 200) {

                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('userType', response.data.userType);
                localStorage.setItem('userId', response.data._id);
                console.log("saved token");
                navigate('/company');
            } else {
                console.error('Login failed');
            }

        } catch (error) {
            console.error("Error logging in:", error);
            message.error(error.response.data);
        }
    };


    return (
        <div className="flex h-screen">
            <div className="w-full sm:w-1/2 lg:w-2/5" style={{backgroundColor: '#e6e6f5'}}>
                <img src={logo} alt="logo" className='w-2/3 sm:w-1/3 lg:w-1/2 mt-4 ml-3'/>
                <img src={anny} alt="logo" className='w-2/3 sm:w-1/3 lg:w-1/6 mt-24 ml-11 absolute'/>
                <img src={conten} alt="logo" className='w-2/3 sm:w-1/3 lg:w-1/6 bottom-9 ml-60 absolute'/>
                <img src={Man} alt="logo"
                     className='w-3/4 sm:w-1/3 lg:w-80 mx-auto block xl:mt-44 lg:mt-32'/> {/* Made the width responsive */}
            </div>
            <div className="sm:w-1/2 lg:w-3/5 bg-white justify-content-center mt-5"> {/* Replaced sm:block with flex */}
            <p className=' mt-3 text-3xl head items-center text-center'>Welcome Back</p>
                <div className='flex justify-content-center mt-5' style={{color: '#D92121'}}>
                    <Link to="/login" className='p-3 font-bold text-xl h-14 topbtn nLink'><p>Job Seeker</p></Link>
                    <Link to="/companylogin" className='p-3 font-bold text-xl h-14 topbtn nLink'><p>Company</p></Link>
                    <Link to="/instituteLogin" className='p-3 font-bold text-xl h-14 topbtn nLink'><p>Institute</p></Link>
                    <Link to="/adminLogin" className='p-3 font-bold text-xl h-14 topbtn nLink'><p>Admin</p></Link>

                </div>


                <div className='w-96 ml-64 flex justify-center items-center'>
                    <Flex vertical gap={16} className='w-full'>
                        <div>
                            <Typography.Title level={5}>Email Address</Typography.Title>
                            <Input size='large' placeholder="Enter email address" allowClear onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div>
                            <Typography.Title level={5}>Password</Typography.Title>
                            <Input size='large' placeholder="Enter Password" allowClear onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </Flex>
                </div>
                <Checkbox style={{fontSize:'1rem'}} className='ml-64 mt-3' onChange={onChange}>Remember Me</Checkbox>
                <div className='w-96 ml-64 mt-3 flex justify-center items-center'>
                    <Flex
                        vertical
                        gap="small"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Button size='large' type="primary" danger block onClick={handleLogin}>
                            Login
                        </Button>
                    </Flex>
                </div>

                <p style={{color: "#202430"}} className='mt-3 items-center text-center'>Don’t have an account? <span
                    className='text-red-500 font-semibold sp' onClick={navTosignIn}>Sign Up</span></p>
            </div>
        </div>
    );
}