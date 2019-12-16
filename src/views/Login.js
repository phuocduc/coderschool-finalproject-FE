import React, {useState} from "react";
import "../assets/css/loginForm.css";
import "../assets/fonts/ionicons.min.css";
import {useHistory} from 'react-router-dom'

import { useAlert } from 'react-alert'

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({})
  const history = useHistory()
  const alert = useAlert()
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLogin)
    })

    const data = await res.json()
      if (data.state === "no_user")
      {
        alert.show("Please register your email first!")
      }
      if (data.state === "WrongPass")
      {
        alert.show("wrong pass", {
          timeout:3000,
          type:"error"
        })
      }
      if (data.state === "success")
      {
        props.setUser({name:data.user, role: data.role})
        localStorage.setItem("token", data.token)
        history.push("/")
        alert.show("Login Success",{
          type:'success'
        })

        localStorage.setItem('name', userLogin.email)
      }
  }



  return (
    <div className="login-dark">
      <form method="POST" onSubmit={e=>handleSubmit(e)}>
        <h2 className="sr-only">Login Form</h2>
        <div className="illustration">
          <i className="icon ion-ios-locked-outline"></i>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            onChange = {(e)=>setUserLogin({...userLogin, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange = {(e)=>setUserLogin({...userLogin, password: e.target.value})}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" type="submit">
            Log In
          </button>
          <button className="btn btn-primary btn-block" onClick={()=>window.location.replace('${process.env.REACT_APP_API_URL}/login/facebook')}>
           Facebook
          </button>
        </div>
        <a className="forgot" href="/forget">
          Forgot your email or password?
        </a>
        <a className="forgot" href="/">
          Back to HomePage  
        </a>
        <a className="forgot" href="/register">
          Register  
        </a>
        
        </form>
    </div>
  );
}
