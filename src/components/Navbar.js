import React from 'react'
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';

import { useEffect} from 'react';

import { useNavigate } from 'react-router-dom';


export default function Navbar() {

  let navigate = useNavigate();

  let location = useLocation();
 


  useEffect(() => {
    console.log(location.pathname);
  }, [location]); //triggers whenever location(path) changes




  const handleLogOut=()=>{
    localStorage.removeItem('token');

    navigate("/login")// redirect to login page if not login

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Advisoropedia</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* { !localStorage.getItem('token') ?<div></div> :  <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
          </li>} */}
             { !localStorage.getItem('token') ?<div></div> :  <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} to="/">general news</Link>
          </li> }
          { !localStorage.getItem('token') ?<div></div> :  <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/sports" ? "active" : ""}`} to="/sports">sports news</Link>
          </li> }
       
          { !localStorage.getItem('token') ?<div></div> :  <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/science" ? "active" : ""}`} to="/science">science news</Link>
          </li> }
          { !localStorage.getItem('token') ?<div></div> :  <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/business" ? "active" : ""}`} to="/business">business news</Link>
          </li> }
         
        
        </ul>
      { !localStorage.getItem('token') ?<div className="d-flex" >
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign-up</Link>
      </div> : 
      <div className="d-flex" >
      <Link className="btn btn-warning mx-2" to="/profile" role="button">Your profile</Link> 
      <Link className="btn btn-primary mx-2" onClick={handleLogOut} to="/logout" role="button">Logout</Link> 
      </div>}
      </div>
    </div>
  </nav>
  )
}
