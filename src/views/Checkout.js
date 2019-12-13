import React, { useState, useEffect } from "react";
import "../assets/css/checkout.css";
import { useParams } from "react-router-dom";
import Navibar from "../components/Navibar"

export default function Checkout(props) {
  const [book_tour, setBook_tour] = useState([]);

  const [checkout, setCheckout] = useState({})
  console.log('checkout', props.user)
  const param = useParams();
  const getBook_tour = async () => {
    const response = await fetch(
      `https://127.0.0.1:5000/book-tour/${param.id}`
    );
    const data = await response.json();
    setBook_tour(data.book_tour);
  };


  useEffect(() => {
    getBook_tour();
  }, []);


  console.log(param.id)

  const handleSubmit = async (e) =>{
      e.preventDefault()
      const res = await fetch(`https://127.0.0.1:5000/checkout/${param.id}`,{
        method : "POST",
        headers:{
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(checkout)
      })
      const data = await res.json()
      if (data.state === "success")
      {
        alert("email was sent to your mailbox")
      }
  }


  const change = e =>{
    setCheckout({
      ...checkout,[e.target.name]: e.target.value
    })
  }
  return (
    <div>

    <Navibar/>
    <div className="container wrap-checkout mt-5">
      <div className="checkout-info col-12 col-md-8">
        <form onSubmit={e=>handleSubmit(e)} onChange={e=>change(e)} className="needs-validation" noValidate>
          <h1>Billing Detail</h1>
          <hr className="hr-checkout" />
          <div className="form-row">
            <div className="col-md-7 mb-3">
              <label>First name *</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="First name"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-7 mb-3">
              <label>Last name *</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Last name"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-7 mb-3">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Country"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-7 mb-3">
              <label>Mobile phone *</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="e.g +83 (0)338019200"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>

            <h4 className="m-2">Where should we send your confirmation?</h4>
            <div className="col-md-7 mb-3">
              <label>Email *</label>
              <input
                type="email"
                // {props.user ? defaultValue={props.user.email}: defaultValue="abc"}
                name="email"
                className="form-control"
                placeholder="Email"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="invalidCheck"
                required
              />
              <label className="form-check-label">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Process to payment
          </button>
        </form>
      </div>

      <div className="checkout-tourinfo col-12 col-md-4">
        {/* tour info  */}
        <div className="wrap-checkoutInfo">
  <div>Total: {book_tour && book_tour.prices}</div>
          <div>
            <img className="img-booktour" src={book_tour && book_tour.image} alt="" />
          </div>
          <div>{book_tour && book_tour.name_tour}</div>
        </div>
      </div>
      {/* End tourinfo */}
    </div>
    </div>

  );
}
