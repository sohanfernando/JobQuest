import NavBar from "../components/NavBar/NavBar";
import HomeImg from "../assets/HomeImg1.png";
import { CiSearch } from "react-icons/ci";
import {IoLocationOutline} from "react-icons/io5";
import React from "react";
import ExploreByJobCategory from "../components/ExploreByJobCategory/ExploreByJobCategory";
import FeaturedJobs from "../components/FeaturedJobs/FeaturedJobs";
import FeaturedCourses from "../components/FeaturedCourses/FeaturedCourses";

export default function HomePage() {
    return (
        <div className="100vh homepage" style={{backgroundColor: '#251E1E', color: "white", height: '100%', overflow: "hidden"}}>
            <NavBar/>

            <div className="row">
                <div className="col-6">
                    <img src={HomeImg} alt="HomeImg" style={{width: '70%', marginLeft: '100px', marginTop:'100px'}}/>
                </div>
            </div>

            <div style={{backgroundColor: "white", width: '700px', marginLeft: '100px', marginTop: '50px'}}>
                <div className="row align-items-center p-2">
                    <div className="col-4 d-flex align-items-center justify-content-start">
                        <CiSearch style={{color: "red", marginRight: "10px"}}/>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="job title or keyword" style={{marginRight: "20px"}}/>
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-center">
                        <IoLocationOutline style={{color: "red", marginRight: "10px"}}/>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Location
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" type="button">Sri Lanka</button>
                                <button className="dropdown-item" type="button">USA</button>
                                <button className="dropdown-item" type="button">UK</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-end">
                        <button className="btn text-light my-2 my-sm-0" type="submit" style={{
                            backgroundColor: 'red',
                            width: '250px',
                            height: '50px',
                            fontSize: "large",
                            marginLeft: '50px'
                        }}>Search Jobs or Institutes
                        </button>
                    </div>
                </div>
            </div>
            <div className="row mb-5" style={{color:"seashell",  marginLeft: '100px'}}>
                Popular : UI Designer, UX Researcher, Android, Admin
            </div>

            <ExploreByJobCategory/>
            <FeaturedJobs/>
            <FeaturedCourses/>

        </div>
    );
}
