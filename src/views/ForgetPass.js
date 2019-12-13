import React, { useState } from "react";
import "../assets/css/loginForm.css";
import "../assets/fonts/ionicons.min.css";

export default function ForgetPass(props) {
  const [forgetUser, setForgetUser] = useState({});
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("https://127.0.0.1:5000/forget/", {
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(forgetUser)
      })
    const data = await res.json()
    if (data.state === "sucess")
    {
      alert("send mail success")
    }

  };
  return (
    <div className="login-dark">
      <form method="POST" onSubmit={e => handleSubmit(e)}>
        <h2 className="sr-only">Forget Password</h2>
        <div className="illustration">
          <i className="icon ion-ios-locked-outline"></i>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            onChange={e =>
              setForgetUser({ ...forgetUser, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" type="submit">
            Send reset link
          </button>
        </div>

        <a className="forgot" href="/login">
          Back to log in
        </a>
      </form>
    </div>
  );
}
