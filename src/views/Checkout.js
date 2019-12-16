import React, { useState, useEffect } from "react";
import "../assets/css/checkout.css";
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert'

export default function Checkout(props) {
  const [book_tour, setBook_tour] = useState([]);

  const [checkout, setCheckout] = useState({});
  const param = useParams();
  const alert = useAlert()

  const getBook_tour = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/book-tour/${param.id}`
    );
    const data = await response.json();
    setBook_tour(data.book_tour);
  };

  useEffect(() => {
    getBook_tour();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/checkout/${param.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(checkout)
    });
    const data = await res.json();
    if (data.state === "success") {
      alert.show("email was sent to your mailbox");
    }
  };

  const change = e => {
    setCheckout({
      ...checkout,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="mt-5 mb-5">
      <div className="container wrap-checkoutt">
        <div className="row">
          <div className="checkout-info container col-12 col-sm-8 col-md-8">
            <form
              onSubmit={e => handleSubmit(e)}
              onChange={e => change(e)}
              className="needs-validation"
              noValidate
            >
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
              <div className="mt-3 mb-3 agreeTicket">
                By ticking the box, you also agree to receive the occasional
                promotional email. You can unsubscribe at any time. For more
                information, read our privacy statement.
              </div>
              <button className="btn btn-primary" type="submit">
                Process to payment
              </button>
              <div className="mt-3 mb-3 agreeTicket">
                By proceeding, you confirm that you accept our General Terms and
                Conditions.
              </div>
            </form>
          </div>

          <div className="checkout-tourinfo col-12 col-sm-4 col-md-4">
            {/* tour info  */}
            <div className="wrap-checkoutInfo">
              <div className="d-flex justify-content-between m-2 checkout-prices">
                <span>Total: </span>
                <span>
                  ₫{" "}
                  {book_tour.prices
                    ? book_tour.prices.toLocaleString()
                    : "none"}
                  <div className="noaddingfees">No additional fees</div>
                </span>
              </div>
              <div>
                <img
                  className="img-booktour"
                  src={book_tour && book_tour.image}
                  alt=""
                />
              </div>

              <div className="m-2">
                <h5>{book_tour.name_tour}</h5>
                <dl className="">
                  <dd className="list-value">{book_tour.name_tour}</dd>
                  <dd className="list-value">
                    {book_tour.dates ? book_tour.dates.split("GMT", 4) : "none"}
                  </dd>
                  <dd className="d-flex justify-content-between">
                    <span>{book_tour.number_people} Adult</span>
                    <span>
                      {" "}
                      ₫{" "}
                      {book_tour.prices
                        ? book_tour.prices.toLocaleString()
                        : "none"}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          {/* End tourinfo */}
        </div>
      </div>
    </div>
  );
}
