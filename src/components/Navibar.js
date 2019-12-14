import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/navibar.css";
import { useHistory } from "react-router-dom";
import {useAlert} from 'react-alert'

export default function Navibar(props) {
  // console.log(props.user)
  const history = useHistory();
  const alert = useAlert()
  const doLogout = async () => {
    const res = await fetch("https://booking-tour-coderschool.herokuapp.com/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success === true) {
        localStorage.clear("token");
        props.setUser(null);
        history.push("/");
        alert.show("See you later!")
      }
    }
  };

  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
      <div className="container">
        <Link to="/" className="navi-brand mr-3">
          S Travel
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
            <Link to="/" className="navi-text">
              Home
            </Link>
            <Link to="/destinations" className="navi-text">
              Destinations
            </Link>
            <Link to="/contact" className="navi-text">
              Contact
            </Link>
            {props.user && props.user.role === true ? (
              <Link to="/dadmin" className="navi-text">
                Portal
              </Link>
            ) : (
              <div></div>
            )}
          </ul>
          <span className="navbar-text actions">
            {props.user ? (
              <div className="dropdown wrap-logout">
                <div className="user-display">Hello {props.user.name}</div>
                <a data-toggle="dropdown">
                  <i
                    className="fa fa-user-circle-o user-icon"
                    aria-hidden="true"
                  ></i>
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" onClick={() => doLogout()}>
                    <i className="fa fa-sign-in mr-2" aria-hidden="true"></i>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <>
                <Link className="btn btn-light action-button mr-1" to="/login">
                  <i className="fa fa-lock mr-2" aria-hidden="true"></i> Log In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-light action-button"
                  role="button"
                >
                  <i className="fa fa-sign-in mr-2" aria-hidden="true"></i>
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
