import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../assets/css/tourInfo.css";
import imageSlider from "../assets/img/sliderNotFound.JPG";
import { Button, Modal } from "react-bootstrap";
import Footer from "../components/Footer";
import { useAlert } from "react-alert";

export default function TourInfo(props) {
  const [toursChild, setTourChild] = useState([]);
  const [tourInfo, setTourInfo] = useState({});
  const [show, setShow] = useState(false);
  const [commentTour, setCommentTour] = useState({
    comment_tour: "",
    user: localStorage.getItem("name")
  });

  const [commentInfo, setCommentInfo] = useState([]);
  console.log(commentInfo, "commentInfo");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fetchComment, setFetchComment] = useState([]);

  const history = useHistory();
  const param = useParams();
  const alert = useAlert();
  const [input, setInput] = useState({
    number: "",
    dates: "",
    languages: ""
  });

  const handleSaveBookTour = async () => {
    const response = await fetch(
      `https://booking-tour-coderschool.herokuapp.com/book-tour/${param.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      }
    );

    const data = await response.json();
    if (data.state === "success") {
      history.push(`/checkout/${data.id}`);
    }
  };

  const handleInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const getTourImg = async () => {
    const res = await fetch(
      `https://booking-tour-coderschool.herokuapp.com/tours/${param.id}/pictures`,
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
      `https://booking-tour-coderschool.herokuapp.com/destinations/${param.id}`
    );
    const data = await response.json();
    setTourInfo(data.tour);
  };
  useEffect(() => {
    getTourInfo();
    getTourImg();
  }, []);

  const handleSubmitComment = async e => {
    e.preventDefault();
    const res = await fetch(`https://booking-tour-coderschool.herokuapp.com/comment/${param.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentTour)
    });

    const data = await res.json();
    setCommentInfo(data);
    getComment();
  };

  const getComment = async () => {
    const res = await fetch(`https://booking-tour-coderschool.herokuapp.com/comment/${param.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    const data = await res.json();
    setFetchComment(data.comment);
  };

  useEffect(() => {
    getComment();
  }, []);

  const [removeComment, setRemoveComment] = useState({
    user: localStorage.getItem("name")
  });
  const deleteComment = async tour_id => {
    const res = await fetch(`https://booking-tour-coderschool.herokuapp.com/comment/${tour_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(removeComment)
    });
    const data = await res.json();
    if (data.state === "success") {
      alert.show("Delete your comment", {
        type: "success"
      });
      getComment();
    }
    if (data.state === "notUser") {
      alert.show("Can not delete other comment", {
        type: "error"
      });
    }
  };

  return (
    <div>
      <div className="simple-slider container-fluid mt-3">
        <div className="activity-title-container container-fluid">
          <h1 className="m-5">{tourInfo.title}</h1>
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
                    <p className="key-audio-detail" id="formm">
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
                  <form
                    onChange={e => handleInput(e)}
                    onSubmit={e => {
                      e.preventDefault();
                      console.log("test");
                    }}
                  >
                    <div className="activity-search">
                      <div className="peoplepicker">
                        <div className="summary">
                          <i className="fa fa-users" aria-hidden="true"></i>
                          <input
                            type="number"
                            min="0"
                            name="number"
                            className="input-sumary"
                            placeholder="people.."
                          />
                        </div>
                      </div>

                      <div className="datepicker">
                        <div className="input-group">
                          <i
                            className="fa fa-calendar-check-o"
                            aria-hidden="true"
                          ></i>
                          <input
                            type="date"
                            min="0"
                            name="dates"
                            className="date-sumarry"
                          />
                        </div>
                      </div>

                      <div className="languagepicker">
                        <div className="language">
                          <i
                            className="fa fa-language mr-2"
                            aria-hidden="true"
                          ></i>
                          <select name="languages" className="select-language">
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

                      <Button
                        type="submit"
                        variant="primary"
                        onClick={handleShow}
                        className="btn-block btn-outline-primary m-3 btn-check"
                      >
                        Check availability
                      </Button>

                      <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Your Tour Detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div>
                            <div className="m-3">
                              <h4>{tourInfo.title}</h4>
                              <div value={input.number}>
                                <span className="mr-5">Client No:</span>
                                People {input.number} x ₫&nbsp;
                                {tourInfo.prices
                                  ? tourInfo.prices.toLocaleString()
                                  : "none"}
                              </div>
                              <div value={input.dates}>
                                <span className="mr-3">Booking Date:</span>
                                {input.dates}
                              </div>

                              <div value={input.languages}>
                                <span className="mr-5">Language:</span>
                                {input.languages}
                              </div>
                              <div value={tourInfo.prices * input.number}>
                                <span className="mr-5">Amount:{"   "}</span>
                                {tourInfo.prices
                                  ? (
                                      tourInfo.prices * input.number
                                    ).toLocaleString()
                                  : "none"}{" "}
                                đ&nbsp;{" "}
                              </div>
                            </div>
                            <button
                              className="btn-block btn btn-primary"
                              onClick={() => {
                                props.user
                                  ? handleSaveBookTour()
                                  : history.push("/login");
                              }}
                            >
                              Go To Checkout
                            </button>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
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
                      đ&nbsp;
                      {tourInfo.prices
                        ? tourInfo.prices.toLocaleString()
                        : "none"}
                    </strong>
                    <span className="price-from">per person</span>
                  </p>
                  <div className="btn-wrap">
                    <a className="btn btn-cta btn-small" href="#formm">
                      Book now
                    </a>
                  </div>
                </div>
                <div className="activity-utils p-3">
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

              {/* comment  */}

              <div>
                <h2 className="mt-3 mb-3">Comment</h2>
                <form onSubmit={e => handleSubmitComment(e)}>
                  <div className="d-flex justify-content-between wrap-comment-input mb-3">
                    <input
                      type="text"
                      className="input-comment"
                      name="comment_tour"
                      placeholder="leave your comment here..."
                      onChange={e =>
                        setCommentTour({
                          ...commentTour,
                          comment_tour: e.target.value
                        })
                      }
                    />
                    {props.user ? (
                      <button type="submit">Comment</button>
                    ) : (
                      <button onClick={() => history.push("/login")}>
                        Hey
                      </button>
                    )}
                  </div>
                </form>
                <div>
                  {fetchComment &&
                    fetchComment.map(el => {
                      return (
                        <div
                          key={el.id}
                          className="d-flex justify-content-between"
                        >
                          <div>
                            <div className="name-comment">
                              {el.user ? el.user.split("@")[0] : "null"}
                            </div>
                            <div>{el.comment}</div>
                          </div>
                          <div>
                            {/* ========= */}
                            <div className="dropdown">
                              <button
                                className="btn dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                              ></button>
                              <div className="dropdown-menu">
                                <a
                                  className="dropdown-item"
                                  onClick={() => deleteComment(el.id)}
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                            {/* =========== */}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* end comment */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
