import React from "react";
import "../assets/css/contact.css";
import {useHistory} from 'react-router-dom'
import contact_header from '../assets/img/contact_header.jpg'
import Navibar from '../components/Navibar'
import Footer from '../components/Footer'

export default function Contact(props) {
    const history = useHistory()
    const handleSubmit = (e) =>{
        e.preventDefault()
    }
  return (
      <div className="contact-clean">
      <Navibar user={props.user} token={props.token} setUser={props.setUser}/>
        <div className="wrap-img-contact" style={{backgroundImage:`url(${contact_header})`}}>
            <div className="wrap-text-contact">
                <h1 className="text-contact">Contact</h1>
            </div>
        </div>
      <form method="post" className="mt-5 mb-5" onSubmit={(e)=>handleSubmit()}>
        <h2 className="text-center">Contact us</h2>
        <h4>Give us</h4>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control is-invalid"
            type="email"
            name="email"
            placeholder="Email"
          />
          <small className="form-text text-danger">
            Please enter a correct email address.
          </small>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="message"
            placeholder="Message"
            rows="14"
          ></textarea>
        </div>
        <div className="form-group d-flex justify-content-between">
          <button className="btn btn-primary" onClick={()=>history.push("/")}>
            <i className="fa fa-home" aria-hidden="true"></i>
            {"<=="}
          </button>
          <button className="btn btn-primary" type="submit">
            send{" "}
          </button>
        </div>
      </form>
      <Footer/>
    </div>
  );
}
