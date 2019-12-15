import React, { useState, useEffect } from "react";
import Navibar from "../components/Navibar";
import "../assets/css/destination.css";
import { useHistory } from "react-router-dom";
import bg_desti from "../assets/img/bg_desti.jpg";
import Footer from "../components/Footer";

export default function Destination(props) {
  const [tourInfos, setTourInfo] = useState([]);
  const [cloneTourInfo, setCloneTourInfo] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPrice, setSearchPrice] = useState({number : ""})
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    const results = cloneTourInfo.filter(el =>
      el.title.includes(searchTerm)
    );
    setTourInfo(results);
  }, [searchTerm]);


  const history = useHistory();
  const getTour = async () => {
    const res = await fetch(
      "https://booking-tour-coderschool.herokuapp.com/tours",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
      );

    const data = await res.json();

    setTourInfo(data.tours);
    setCloneTourInfo(data.tours)
  };

  useEffect(() => {
    getTour();
  }, []);



const handleChoosePrices = (e) =>{
  setSearchPrice({...searchPrice, [e.target.name]: e.target.value})
  const priceSplit = e.target.value.split("-")
  const result = cloneTourInfo.filter(x => x.prices >= priceSplit[0] && x.prices 
    <= priceSplit[1])
  setTourInfo(result)
}


  return (
    <div>
      <Navibar user={props.user} token={props.token} setUser={props.setUser} />
      <div
        className="wrap-img-desti"
        style={{ backgroundImage: `url(${bg_desti}` }}
      >
        <div className="cover-text-desti">
          <div className="cover-text-desti-px">
            <h2 className="text-desti">
              Are you ready for your Pack Up + Go adventure?
            </h2>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center m-4">
        <h1 className="title-desti">Destinations</h1>
      </div>


      

      {/* tim */}
      <div className="d-flex justify-content-center">

      <div className="search-tour-wrapper">

      <input
        placeholder="Where you want to go..."
        name="searchTour"
        type="text"
        className="search-tour"
        value={searchTerm}
        onChange={handleChange}
        />
        <i className="fa fa-search searchIcon" aria-hidden="true"></i>

        </div>
        </div>
     <div className="mb-5 mt-2 d-flex justify-content-center">

        <select className="btn btn-outline-danger" name="pick-price" onChange={(e)=>handleChoosePrices(e)}>
          <option value="0-90000000">-- Choose Tour Prices --</option>
          <option value="0-5000000">under 5 million VND</option>
          <option value="5000000-10000000">From 5 -> 10 million VND</option>
          <option value="10000000-50000000">From 10 -> 50 million VND</option>
          <option value="50000000-90000000">Over 50 million VND</option>
        </select>
     </div>
      {/* tim test end */}

      <div className="gtco-section">
        <div className="gtco-container">
          <div className="row gtco-card-info">
            {tourInfos &&
              tourInfos.map(tour => {
                var price = tour.prices;
                var scalePrice = price.toLocaleString();
                return (
                  <div className="col-lg-4 col-md-4 col-sm-4" key={tour.id}>
                    <a
                      onClick={() => history.push(`/destinations/${tour.id}`)}
                      className="fh5co-card-item image-popup"
                    >
                      <figure className="image-center">
                        <div className="overlay">
                          <i className="ti-plus"></i>
                        </div>
                        <img
                          src={tour.image_main}
                          alt="Image"
                          className="img-responsive img-center-first"
                        />
                      </figure>
                      <div className="fh5co-text">
                        <h2>{tour.title}</h2>
                        <h2>Price: {scalePrice} VND</h2>
                        <h2>
                          {tour.duration_day} day {tour.duration_day - 1} night{" "}
                        </h2>
                        <p>
                          <span className="btn btn-primarys">View Tour</span>
                        </p>
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
