import React, {useState} from "react";
import "../assets/css/registerForm.css";
import {useAlert} from 'react-alert'

export default function Register() {
  const [userRegister, setUserRegister] = useState({});
  const alert = useAlert()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/register/`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(userRegister) 
        })
    const data = await res.json()
    if(data.state === "success")
    {
       alert.show("Register Success",{
         type:"success"
       })
    }
    if(data.state === "user_exist"){
      alert.show("Email had registed already",{
        type:'info'
      })
    }
  }



  return (  
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form method="POST" onSubmit={e => handleSubmit(e)} >
          <h2 className="text-center">
            <strong>Create</strong> an account.
          </h2>
          <div className="form-group">
            <input
              className="form-control"
              type="username"
              name="username"
              placeholder="User Name"
              onChange = {(e)=>setUserRegister({...userRegister, username: e.target.value})}
            />

          </div>
          <div className="form-group"> 
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              onChange = {(e)=>setUserRegister({...userRegister, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              onChange = {(e)=>setUserRegister({...userRegister, password: e.target.value})}
            />
          </div>
          <div className="form-group">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" />I agree to the
                license terms.
              </label>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Sign Up
            </button>
          </div>
          <a className="already" href="/login">
            You already have an account? Login here.
          </a>
        </form>
      </div>
    </div>
  );
}
