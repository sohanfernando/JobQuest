import {FaArrowRight, FaCode, FaRegMoneyBillAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import React from "react";
import './ExploreByJobCategory.css';
import {LuPencilRuler} from "react-icons/lu";
import {IoBagHandleOutline, IoStatsChartSharp} from "react-icons/io5";
import {GrAnnounce} from "react-icons/gr";
import {HiOutlineDesktopComputer} from "react-icons/hi";
import {FaPeopleGroup} from "react-icons/fa6";

export default function ExploreByJobCategory() {
    return (
        <div style={{color: '#251E1E', marginLeft: '100px', height: '100vh', marginTop: '100px'}}>
            <div className="row align-items-center">
                <div className="col">
                    <div style={{color: "white", fontSize: '40px', display: 'inline'}}>Explore by</div>
                    <div style={{color: "red", fontSize: '40px', display: 'inline'}}> Job Category</div>
                </div>
                <div className="col text-right">
            <span style={{marginTop: '20px', marginBottom: '0px'}}>
                <Link to="/" className="nav-link" style={{
                    color: "red",
                    marginRight: '100px',
                    fontSize: "large",
                    marginTop: '20px'
                }}>Show all Jobs <FaArrowRight className="float-end mt-1"/></Link>
            </span>
                </div>
            </div>

            <div className="row mt-5" style={{marginRight: '80px'}}>

                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <LuPencilRuler className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">UI Designer</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>


                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <IoStatsChartSharp className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">Sales</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <GrAnnounce className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">Marketing</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <FaRegMoneyBillAlt className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">Finance</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row mt-5" style={{marginRight: '80px'}}>

                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <HiOutlineDesktopComputer className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">Technology</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>


                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <FaCode className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">Engineering</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <IoBagHandleOutline className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">Business</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card category-card" style={{width: '18rem', backgroundColor: "white", color: "black"}}>
                        <div className="card-body">
                            <FaPeopleGroup className="mt-3 mx-3 category-card-img" style={{color: "blue", fontSize: '50px'}}/>
                            <div className="card-title fs-5 mt-5 mx-3">Human Resource</div>
                            <Link to="/" className="nav-link mx-3" style={{color: "darkgray"}}>500+ Jobs
                                available <FaArrowRight style={{color: "black"}}/></Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}