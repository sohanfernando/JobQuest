import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/jobQuestLogo.png';

export default function NavBar() {
    function nevigateToLog() {
        window.location.href = "/login";
    }

    function navigateToSignin() {
        window.location.href = "/signin";
    }

    return (
        <nav className="navbar navbar-expand-lg " style={{backgroundColor: '#251E1E', paddingLeft: '10px', overflow:"hidden",visibility: 'visible'}}>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active" style={{marginRight: '20px', marginLeft: '50px'}}>
                        <img src={Logo} alt="Logo" style={{width: 'auto', height: '45px'}}/>
                    </li>
                    <li className="nav-item" style={{marginRight: '20px'}}>
                        <Link to="/login" className="nav-link" style={{color: 'white', fontSize: "large"}}>Find Jobs</Link>
                    </li>
                    <li className="nav-item" style={{marginRight: '20px'}}>
                        <Link to="/login" className="nav-link" style={{color: 'white', fontSize: "large"}}>Browse
                            Courses</Link>
                    </li>
                    {/* <li className="nav-item" style={{marginRight: '20px'}}>
                        <Link to="/login" className="nav-link" style={{color: 'white', fontSize: "large"}}>User</Link>
                    </li> */}
                    {/* <li className="nav-item" style={{marginRight: '20px'}}>
                        <Link to="/companylogin" className="nav-link"
                              style={{color: 'white', fontSize: "large"}}>Company</Link>
                    </li> */}
                    {/*<li className="nav-item" style={{marginRight: '20px'}}>*/}
                    {/*    <Link to="/adminLogin" className="nav-link"*/}
                    {/*          style={{color: 'white', fontSize: "large"}}>Admin</Link>*/}
                    {/*</li>*/}
                    {/* <li className="nav-item" style={{marginRight: '20px'}}>
                        <Link to="/instituteLogin" className="nav-link"
                              style={{color: 'white', fontSize: "large"}}>Institute</Link>
                    </li> */}
                    <li className="nav-item" style={{marginRight: '20px'}}>
                        <Link to="/employee" className="nav-link"
                              style={{color: 'white', fontSize: "large"}}>Employee</Link>
                    </li>
                </ul>

                <button className="btn my-2 my-sm-0" type="submit"
                        style={{marginRight: '20px', fontSize: "large", color: "red"}} onClick={nevigateToLog}>Login
                </button>
                <div style={{borderLeft: '1px solid white', height: '30px', display: 'inline-block', verticalAlign: 'middle', marginRight: '20px'}}/>
                <button className="btn text-light my-2 my-sm-0" type="submit" style={{backgroundColor: 'red', width: '90px', height: '50px', fontSize: "large", marginRight: '50px'}} onClick={navigateToSignin}>Sign Up</button>

            </div>
        </nav>
    );
}
