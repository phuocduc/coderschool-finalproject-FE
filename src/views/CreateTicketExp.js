import React,{useState} from 'react'
import '../assets/css/createTicketExp.css'
import {useHistory, useParams} from 'react-router-dom'

export default function CreateTicketExp() {
    const [tourInfo, setTourInfo] = useState({})
    console.log('sdf',tourInfo)
    const history = useHistory()
    const param = useParams()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res = await fetch(`https://127.0.0.1:5000/products/${param.id}/info`,{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(tourInfo)
        })
        const data = await res.json()
        if (data.state === "success")
        {
            alert("add success!")
        }
    }
  


    return (
        
        <div className="container-fluid productInfo-body">
            <div className=" d-flex justify-content-center flex-column align-items-center ">
                    <h1 className="text-center m-3 title-productInfo">Add Ticket Information</h1>
                    <form className="product_info" method="POST" onSubmit={e=>handleSubmit(e)}>
                    
                        <div className="form-group">
                        <input
                            className="form-control"
                            type="number"
                            name="durationDay"
                            placeholder="Duration Day"
                            onChange = {(e)=>setTourInfo({...tourInfo, ticketDay: e.target.value})}
                        />
                        </div>
                        <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="instant"
                            placeholder="instant Confirm"
                            onChange = {(e)=>setTourInfo({...tourInfo, instant: e.target.value})}
                        />
                        </div>
                        <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="audio"
                            placeholder="Language "
                            onChange = {(e)=>setTourInfo({...tourInfo, audio: e.target.value})}
                        />
                        </div>
                        <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="cancelPolicy"
                            placeholder="Policy"
                            onChange = {(e)=>setTourInfo({...tourInfo, cancelPolicy: e.target.value})}
                        />
                        </div>
                    


                                <div className="form-group">
                                <textarea
                                className="form-control mt-2"
                                    type="text"
                                    name="hightLight"
                                    placeholder="Hight Light..."
                                    onChange = {(e)=>setTourInfo({...tourInfo, hightLight: e.target.value})}
                                rows="4" cols="50" form="usrform"></textarea>
                               
                                <textarea
                                className="form-control mt-2"
                                type="text"
                                name="description"
                                placeholder="description..."
                                onChange = {(e)=>setTourInfo({...tourInfo, description: e.target.value})}
                                rows="4" cols="50" form="usrform"></textarea>
                            
                                <textarea
                                className="form-control mt-2"
                                type="text"
                                name="includes"
                                placeholder="Includes..."
                                onChange = {(e)=>setTourInfo({...tourInfo, includes: e.target.value})}
                                rows="4" cols="50" form="usrform"></textarea>
                                </div>
                               
                              
                                   
                                
                                <div className="form-group d-flex justify-content-end button-productInfo">
                                <button className="btn btn-primary mr-1" onClick={()=>history.push('/dadmin')}>
                                Exit
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    Create Tour
                                </button>
                                </div>
                        </form>
                        
            </div>

          </div>
    )
}
