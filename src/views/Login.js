import React, {useState} from "react";
import "../assets/css/loginForm.css";
import "../assets/fonts/ionicons.min.css";
import {useHistory} from 'react-router-dom'

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({})

  const history = useHistory()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const res = await fetch("https://127.0.0.1:5000/login/",{
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLogin)
    })
    const data = await res.json()
      if (data.state === "NoUser")
      {
        alert("email do not exist")
      }
      if (data.state === "WrongPass")
      {
        alert("wrong pass")
      }
      if (data.state === "success")
      {
        props.setUser({name:data.user, role: data.role})
        localStorage.setItem("token", data.token)
        history.push("/")
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
          <button className="btn btn-primary btn-block" onClick={()=>window.location.replace('https://127.0.0.1:5000/login/facebook')}>
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
