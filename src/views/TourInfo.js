import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../assets/css/tourInfo.css";
import Navibar from "../components/Navibar";
import imageSlider from "../assets/img/sliderNotFound.JPG";
import { Button, Modal } from "react-bootstrap";

export default function TourInfo() {
  const [toursChild, setTourChild] = useState([]);
  const [tourInfo, setTourInfo] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const param = useParams();
  const history = useHistory();
  console.log(tourInfo);
  const getTourImg = async () => {
    const res = await fetch(
      `https://127.0.0.1:5000/tours/${param.id}/pictures`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    if (res.status !== 200) return;

    const data = await res.json();
    setTourChild(data.Image[0]);
  };

  const getTourInfo = async () => {
    const response = await fetch(
      `https://127.0.0.1:5000/destinations/${param.id}`
    );
    const data = await response.json();
    setTourInfo(data.tour);
  };
  useEffect(() => {
    getTourInfo();
    getTourImg();
  }, []);

  return (
    <div>
      <Navibar />

      <div className="simple-slider container-fluid">
        <div className="activity-title-container">
          <h1>{tourInfo.title}</h1>
        </div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url(${
                    toursChild ? toursChild.img_first : imageSlider
                  })`
                }}
              ></div>
            </div>

            <div className="carousel-item">
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url(${
                    toursChild ? toursChild.img_second : imageSlider
                  })`
                }}
              ></div>
            </div>

            <div className="carousel-item">
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url(${
                    toursChild ? toursChild.img_third : imageSlider
                  })`
                }}
              ></div>
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
            data-slide-to="1"
            data-target="#carouselExampleIndicators"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
            data-slide-to="2"
            data-target="#carouselExampleIndicators"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        {/* info tour */}
        <div className="activity-columns container-fluid">
          <div className="row">
            <div className="activity-column-major container-fluid col-12 col-md-8">
              {/* description  */}
              <div className="overview-certified-container">
                <div className="content">{tourInfo.description}</div>
              </div>
              <div className="overview-certified-container mt-5 mb-5">
                <div className="key-detail">
                  <div className="key-detail-head">About this ticket</div>
                  <div className="key-detail-list">
                    <span>
                      <i className="fa fa-clock-o mr-3" aria-hidden="true"></i>
                      Duration {tourInfo.duration_day} day
                    </span>
                  </div>
                  <div className="key-detail-list">
                    <span>
                      <i className="fa fa-truck mr-3" aria-hidden="true"></i>
                      Skip the ticket line
                    </span>
                  </div>
                  <div className="key-detail-list">
                    <span>
                      <i
                        className="fa fa-bookmark-o mr-3"
                        aria-hidden="true"
                      ></i>
                      Printed or mobile voucher accepted
                    </span>
                  </div>
                  <div className="key-detail-list">
                    <span>
                      <i className="fa fa-bolt mr-4" aria-hidden="true"></i>
                      Instant confirmation
                    </span>
                  </div>
                  <div className="key-detail-list key-audio">
                    <span>
                      <i
                        className="fa fa-headphones mr-3"
                        aria-hidden="true"
                      ></i>
                      Audio guide/headphones{" "}
                    </span>
                    <br />
                    <p className="key-audio-detail">
                      Spanish, Chinese, Dutch, English, French, German, Italian,
                      Japanese, Polish, Portuguese, Russian
                    </p>
                  </div>
                  <div className="key-detail-list">
                    <span>
                      <i
                        className="fa fa-wheelchair mr-3"
                        aria-hidden="true"
                      ></i>
                      Wheelchair accessible
                    </span>
                  </div>
                  <div className="key-detail-list key-audio">
                    <span>
                      <i
                        className="fa fa-address-card-o mr-3"
                        aria-hidden="true"
                      ></i>
                      Cancellation policy
                    </span>
                    <br />
                    <p className="key-audio-detail">
                      This activity is non-refundable
                    </p>
                  </div>
                </div>
                <div className="header-form-container">
                  <div className="header">
                    <h2 className="head mb-3">
                      Select participants, date and language:
                    </h2>
                  </div>
                  {/* form */}
                  <form className="activity-search" id="formm">
                    <div className="peoplepicker">
                      <div className="summary">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <input
                          type="number"
                          min="0"
                          className="input-sumary"
                          placeholder="people.."
                        />
                      </div>
                    </div>

                    <div className="datepicker">
                      <div className="input-group">
                        <i
                          class="fa fa-calendar-check-o"
                          aria-hidden="true"
                        ></i>
                        <input type="date" min="0" className="date-sumarry" />
                      </div>
                    </div>

                    <div className="languagepicker">
                      <div className="language">
                        <i class="fa fa-language mr-2" aria-hidden="true"></i>
                        <select className="select-language">
                          <option value="English">English</option>
                          <option value="Chinese">Chinese</option>
                          <option value="Dutch">Dutch</option>
                          <option value="Italian">Italian</option>
                          <option value="Japanese">Japanese</option>
                          <option value="German">German</option>
                          <option value="VietNam">VietNam</option>
                          <option value="Russian">Russian</option>
                        </select>
                      </div>
                    </div>

              
                    <Button variant="primary" onClick={handleShow} className="btn-block btn-outline-primary m-3 btn-check">
                        Check availability
                    </Button>

                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Availability</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                        <div>
                          Number of Customer: 
                          
                          </div>
                        <div>
                        Time:

                        </div>
                        
                        <div>
                        Language:

                        </div>
                        <button className="btn-primary">Book Tour</button>

                        </form>
                        
                  
                      </Modal.Body>
                    </Modal>
                  </form>
                </div>
              </div>
            </div>
            {/* price  */}
            <div className="activity-column-minor col-12 col-md-4 ">
              <div className="price-block">
                <div className="activity-features-price top-border-highlight">
                  <p className="price">
                    <span className="price-from">From</span>
                    <strong className="price-actual">
                      đ&nbsp;{tourInfo.prices}
                    </strong>
                    <span className="price-from">per person</span>
                  </p>
                  <div className="btn-wrap">
                    <a className="btn btn-cta btn-small" href="#formm">
                      Book now
                    </a>
                  </div>
                </div>
                <div className="activity-utils">
                  <ul>
                    <li className="activity-utils-checklist-item box-item icon-heart">
                      <a>
                        <span>
                          <i
                            className="fa fa-heart mr-3"
                            aria-hidden="true"
                          ></i>
                          Add to wishlist
                        </span>
                      </a>
                    </li>
                    <li className="activity-utils-checklist-item icon-gift">
                      <a>
                        <span>
                          <i className="fa fa-gift mr-3" aria-hidden="true"></i>
                          Give this as a gift
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
