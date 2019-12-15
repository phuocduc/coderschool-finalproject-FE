import React,{useState} from "react";
import "../assets/css/contact.css";
import { useHistory } from "react-router-dom";
import contact_header from "../assets/img/contact_header.jpg";
import Navibar from "../components/Navibar";
import Footer from "../components/Footer";
import {useAlert} from 'react-alert'

export default function Contact(props) {
  const [contact, setContact] = useState({})
  const alert = useAlert()
  console.log(contact,"sdfsdf")
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://booking-tour-coderschool.herokuapp.com/contact",{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(contact)
    })
    const data = await response.json()
    if (data.state === "success")
    {
      alert.show("We will contact to you soon",{
        type:"info",
        timeout:5000
      })
    }
  };
  return (
    <div className="contact-clean">
      <Navibar user={props.user} token={props.token} setUser={props.setUser} />
      <div
        className="wrap-img-contact"
        style={{ backgroundImage: `url(${contact_header})` }}
      >
        <div className="wrap-text-contact">
          <h1 className="text-contact">Contact</h1>
        </div>
      </div>
      <div className="wrapp-questionNote m-5">
        <div className="note-contact-title mb-3">
          QUESTIONS? INTRIGUED? LET'S CHAT.
        </div>
        <div className="note-contact m-3">
        General inquiry? Please email <span className="atagEmail">phuocduc2012@gmail.com</span>
        </div>
        <div className="note-contact m-3">
          Press or media inquiry? Please email <span className="atagEmail">phuocduc2012@gmail.com</span>
        </div>
        <div className="note-contact m-3">
          Already booked a trip? Please email <span className="atagEmail">phuocduc2012@gmail.com</span>
        </div>
        <div className="note-contact m-3">
          Wanna chat on the phone? Give us a ring Monday-Friday, 9AM-5PM EST:
         (84) 033 8019200
        </div>
      </div>

      <form method="POST" className="mt-5 mb-5" onSubmit={e => handleSubmit(e)}>
        <h2 className="text-center">Contact us</h2>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e)=> setContact({...contact, name:e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <input
            className="form-control is-invalid"
            type="email"
            name="email"
            placeholder="Email"
            onChange = {(e)=>setContact({...contact, email: e.target.value})}
          />
          <small className="form-text text-danger">
            Please enter a correct email address.
          </small>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e)=>setContact({...contact,title:e.target.value})}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="comment"
            placeholder="Message"
            rows="14"
            onChange = {(e)=>setContact({...contact,comment:e.target.value})}
          ></textarea>
        </div>
        <div className="form-group d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => history.push("/")}>
            <i className="fa fa-home" aria-hidden="true"></i>
            {"<=="}
          </button>
          <button className="btn btn-primary" type="submit">
            send{" "}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
