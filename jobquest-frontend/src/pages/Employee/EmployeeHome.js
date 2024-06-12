import React from 'react';
import './EmployeeHome.css';
import employee from "../../assets/emloyeebg.png";
import Logo from "../../assets/logoBlack.png";
import {useNavigate} from "react-router-dom";

export default function EmployeeHome() {
    const nevigate=useNavigate();

    const navTopost=()=>{
        nevigate('/createAc');
    }
    return (
        <div>
            <div className="div1">
                <div className='flex'>
                    <img src={Logo} alt="" className='mt-4 ml-3' style={{width:'20rem'}}/>
                    <p className='text-2xl font-semibold text-red-500 mt-5 ml-1 pt-2'>For Employee</p>
                </div>

                <img src={employee} alt="" className='w-full mt-10'/>
                <p className='text-4xl text-white font-bold text-center items-center mt-3'>10,000+ Skilled Workers Ready. Fill Your Jobs Fast.</p>
                <p className='text-4xl text-white font-bold text-center items-center mt-3'>Get started today.</p>

                <div className='flex justify-center items-center mt-5'>
                    <button className='bg-red-500 text-white font-bold py-2 px-4 rounded'>Contact Us</button>
                    <button className='bg-white text-red-500 font-bold py-2 px-4 rounded ml-3' onClick={navTopost}>Post a Job</button>
                </div>
            </div>
            <div className="div2"></div>
        </div>
    );
}
