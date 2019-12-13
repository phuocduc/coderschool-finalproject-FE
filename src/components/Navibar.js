import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/navibar.css";
import {useHistory} from 'react-router-dom'

export default function Navibar(props) {
  // console.log(props.user)
  const history = useHistory()
  const doLogout = async () =>{
    const res = await fetch('https://127.0.0.1:5000/logout',{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.ok){
      const data = await res.json()
      if(data.success === true){
        localStorage.clear('token')
        props.setUser(null)
        history.push("/")
      }
    }
  }

  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Travel
        </Link>
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav mr-auto">
            <li className="nav-item" role="presentation"></li>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/destinations" className="nav-link">
              Destinations
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            {props.user && props.user.role === true? (
              <Link to="/dadmin" className="nav-link">
              Admin
              </Link>
            ) : <div></div>
                
                }
        

          </ul>
          <span className="navbar-text actions">
          {props.user ? (
            <div className="dropdown">
            <i className="fa fa-user" aria-hidden="true"></i>
              <a data-toggle="dropdown">
              {props.user.name}
              </a>
              <div className="dropdown-menu" >
                <a className="dropdown-item" onClick={()=>doLogout()}>Logout</a>
              </div>
            </div>
             
              ) 
            : (
              <>
                <Link className="login" to="/login">
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-light action-button"
                  role="button"
                >
                  Sign Up
                </Link>
              </>
            )}





          </span>



        </div>
      </div>
    </nav>
  );
}
