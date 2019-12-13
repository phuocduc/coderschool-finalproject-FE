import React, {useState} from 'react'
import "../assets/css/loginForm.css";
import "../assets/fonts/ionicons.min.css";
import {useParams, useHistory} from 'react-router-dom';

export default function RecoverPass(props) {
  const params = useParams()
  const history = useHistory()
  const [recover ,setRecover] = useState({token:params['token']})

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(recover)
        const res = await fetch(`https://127.0.0.1:5000/new_password`,  {
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recover)
        })
        const data = await res.json()
        if (data.state === "success"){
          alert("change password success")
          history.push("/login")
        }

        
    }
    return (
        <div className="login-dark">
        <form method="POST" onSubmit={e=>handleSubmit(e)}>
          <h2 className="sr-only">Recover Password</h2>
          <div className="illustration">
            <i className="icon ion-ios-locked-outline"></i>
          </div>
          
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              onChange = {(e)=>setRecover({...recover, password: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="confirm"
              placeholder="Confirm"
              onChange = {(e)=>setRecover({...recover, confirm: e.target.value})}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    );
}
