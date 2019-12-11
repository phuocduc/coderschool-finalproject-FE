import React, {useState, useEffect} from "react";
import Navibar from "../components/Navibar";
import '../assets/css/destination.css'
import {useHistory} from 'react-router-dom'


export default function Destination(props) {
  const [tourInfos, setTourInfo] = useState([])
  const history = useHistory()
  const getTour = async () =>{
    const res = await fetch("https://127.0.0.1:5000/tours",{
      method : "GET",
      headers:{
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()
    setTourInfo(data.tours)
  } 

 

  useEffect(() => {
    getTour();
  }, []);
  return (
    <div>
      <Navibar user={props.user} token={props.token} setUser = {props.setUser}/>

      <div className="gtco-section">
      <div className="gtco-container">
      <div className="row gtco-card-info">
          {tourInfos && tourInfos.map(tour =>{
            var price = tour.prices
            var scalePrice = price.toLocaleString()
            return (
                        <div className="col-lg-4 col-md-4 col-sm-4" key={tour.id}>
                            <a onClick={()=>history.push(`/destinations/${tour.id}`)} className="fh5co-card-item image-popup">
                                <figure className="image-center">
                                    <div className="overlay"><i className="ti-plus"></i></div>
                                    <img src={tour.image_main} alt="Image" className="img-responsive img-center-first"/>
                                </figure>
                                <div className="fh5co-text">
                                    <h2>{tour.title}</h2>
                                    <h2>Price: {scalePrice} VND</h2>
                                    <h2>{tour.duration_day} day {tour.duration_day - 1} night </h2>
                                    <p><span className="btn btn-primarys">View Tour</span></p>
                                </div>
                               
                            </a>
                        </div>
                        )
                      })}
                  </div>
            </div>
          </div>
    </div>
  );
}
