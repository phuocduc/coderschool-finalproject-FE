import React, {useState} from 'react'
import "../assets/css/loginForm.css";
import "../assets/fonts/ionicons.min.css";
import {useParams, useHistory} from 'react-router-dom';
import {useAlert} from 'react-alert'

export default function RecoverPass(props) {
  const params = useParams()
  const history = useHistory()
  const [recover ,setRecover] = useState({token:params['token']})
  const alert = useAlert()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res = await fetch(`${process.env.REACT_APP_API_URL}/new_password`,  {
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recover)
        })
        const data = await res.json()
        if (data.state === "success"){
          history.push("/login")
          alert.show("Change password success",{
            type:'success'
          })
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
