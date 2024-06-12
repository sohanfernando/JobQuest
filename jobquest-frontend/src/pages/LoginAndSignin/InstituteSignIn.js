import React, {useState} from "react";
import logo from "../../assets/logoBlack.png"; // Import the image
import Man from "../../assets/bsMan.png"; // Import the image
import anny from "../../assets/annaliticsimg.png"; // Import the image
import conten from "../../assets/frontContent.png"; // Import the image
import './Login.css'
import GoogleButton from "react-google-button";
import {Button, Flex, Input, message, Typography} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import axios from 'axios';

export default function InstituteSignIn() {
    const navigate = useNavigate();
    const [instituteData, setInstituteData] = useState({
        instituteName: '',
        email: '',
        password: '',
        description: '',
        location: '',
        websiteUrl: '',
        instituteType: 'public'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInstituteData({ ...instituteData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8070/api/institute/register', instituteData);
            message.success('Institute details saved successfully.');
            window.href = '/login';
        } catch (error) {
            console.error('Error saving institute details:', error);
            message.error('Error saving institute details.');
            message.error('EMPTY Fields');

        }
    };

    const navToLogin = () => {
        navigate('/instituteLogin');
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
            <div className="sm:w-1/2 lg:w-3/5 bg-white justify-content-center mt-4"> {/* Replaced sm:block with flex */}
                <div className='flex justify-content-center mt-5' style={{color: '#D92121'}}>
                    <Link to="/signin" className='p-3 font-bold text-xl h-14 topbtn nLink'><p>Job Seeker</p></Link>
                    <Link to="/companySignIn" className='p-3 font-bold text-xl h-14 topbtn nLink'><p>Company</p></Link>
                    <Link to="/instituteSignIn" className='p-3 font-bold text-xl h-14 topbtn nLink'><p>Institute</p></Link>
                </div>
                <p className=' mt-3 text-3xl head items-center text-center'>Get more opportunities</p>
                {/* <div className='flex justify-center items-cente mt-5'>
                    <GoogleButton
                        type="light"
                        label="Sign Up with Google"
                        style={{color: 'red', fontWeight: 'bold', width: "23rem"}}
                        onClick={() => {
                            console.log('Google button clicked')
                        }}
                    />
                </div>
                <p className='mt-3 text-2sm head items-center text-center'>
                    <span style={{whiteSpace: 'nowrap'}}>----------------- </span>
                    Or sign up with email
                    <span style={{whiteSpace: 'nowrap'}}> ------------------</span>
                </p> */}

                <div className='flex justify-center items-center' style={{width:'31rem',marginLeft:'13rem'}}>
                    <table style={{width:'100%'}}>
                        <tbody>
                        <tr>
                            <td>
                                <Typography.Title level={5}>Institute Name</Typography.Title>
                                <Input
                                    size='large'
                                    placeholder="Enter Institute Name"
                                    allowClear
                                    name="instituteName"
                                    value={instituteData.instituteName}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Typography.Title level={5}>Email Address</Typography.Title>
                                <Input
                                    size='large'
                                    placeholder="Enter email address"
                                    allowClear
                                    name="email"
                                    value={instituteData.email}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography.Title level={5}>Password</Typography.Title>
                                <Input.Password
                                    size='large'
                                    placeholder="Enter Password"
                                    allowClear
                                    name="password"
                                    value={instituteData.password}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Typography.Title level={5}>Description</Typography.Title>
                                <TextArea
                                    size='large'
                                    placeholder="Enter Description"
                                    allowClear
                                    name="description"
                                    value={instituteData.description}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography.Title level={5}>Location</Typography.Title>
                                <Input
                                    size='large'
                                    placeholder="Enter Location"
                                    allowClear
                                    name="location"
                                    value={instituteData.location}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Typography.Title level={5}>Website URL</Typography.Title>
                                <Input
                                    size='large'
                                    placeholder="Enter Website URL"
                                    allowClear
                                    name="websiteUrl"
                                    value={instituteData.websiteUrl}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className='w-96 ml-64 mt-3 flex justify-center items-center'>
                    <Flex
                        vertical
                        gap="small"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Button size='large' type="primary" onClick={handleSubmit} danger block>
                            Continue
                        </Button>
                    </Flex>
                </div>
                <p style={{color: "#202430"}} className='mt-3 items-center text-center'>Already have an account? <span
                    className='text-red-500 font-semibold sp' onClick={navToLogin}>Login</span></p>
                <div className='w-50 ml-60 flex justify-center items-center'>
                    <p className='text-sm' style={{color: "#7C8493"}} >By clicking 'Continue', you acknowledge that you have read and accept the <span className='text-red-500 font-semibold'>Terms of Service</span> and
                        <span className='text-red-500 font-semibold'>Privacy Policy.</span></p>
                </div>
            </div>
        </div>
    );
}