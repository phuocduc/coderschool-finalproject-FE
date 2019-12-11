import React, { useState, useEffect } from "react";
import Navibar from "../components/Navibar";
import ErrorPage from "../views/ErrorPage";
import "../assets/css/adminpage.css";
import { useHistory } from "react-router-dom";
import {Button, Modal} from 'react-bootstrap'


export default function Adminpage(props) {
  const [tour, setTour] = useState({});
  const [showTourList, setShowTourList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log('tour',tour)
  const getTourAd = async () => {
    const res = await fetch("https://127.0.0.1:5000/tours");
    const data = await res.json();
    setShowTourList(data.tours);
  };

  useEffect(() => {
    getTourAd();
  }, []);


  const history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("https://127.0.0.1:5000/tours", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tour)
    });
    if (res.status !== 200) return;
    const data = await res.json();
    if (data.state === "success") {
      alert("add new tour success");
      handleClose()

      getTourAd();
    }
  };
  const remove_tour = async id => {
    const res = await fetch(`https://127.0.0.1:5000/tours/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    if (data.state === "delete_success") {
      alert("delete success");
      getTourAd();
      // window.history.replaceState({}, document.title, window.location.pathname)
    }
  };


  if (!props.user) return <ErrorPage />;
  return (


    <div>
      <Navibar user={props.user} token={props.token} setUser={props.setUser} />


   {/* react modal  */}
   <Button variant="primary" onClick={handleShow}>
        + Add Tour
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form
                className="form-admin d-flex flex-column"
                method="POST"
                onSubmit={e => handleSubmit(e)}
              >
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Tour Name"
                    onChange={e => setTour({ ...tour, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="image_main"
                    placeholder="Url Image"
                    onChange={e =>
                      setTour({ ...tour, image_main: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    name="duration_day"
                    placeholder="How long tour go?"
                    onChange={e =>
                      setTour({ ...tour, duration_day: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="content"
                    placeholder="Content' Tour"
                    onChange={e =>
                      setTour({ ...tour, content: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder="description' Tour"
                    onChange={e =>
                      setTour({ ...tour, description: e.target.value })
                    }
                  />
                </div>


                      <select className="custom-select mb-3" onChange={e => setTour({ ...tour, status: e.target.value })}>
                        <option value="Ready">Ready</option>
                        <option value="Comming">Comming</option>
                        <option value="Closed">Closed</option>
                     </select>

              

                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    name="prices"
                    placeholder="Price for Tour"
                    onChange={e => setTour({ ...tour, prices: e.target.value })}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={()=>handleClose()}
                    >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    type="submit"
                  >
                    Save changes
                  </button>
               
                </div>
              </form>
        </Modal.Body>
      
      </Modal>


      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Url</th>
            <th scope="col">Day</th>
            <th scope="col">Prices</th>
          </tr>
        </thead>

        {showTourList &&
          showTourList.map(tourAd => {
            return (
              <tbody key={tourAd.id}>
                <tr>
                  <th
                    scope="row"
                    onClick={() => history.push(`/tours/${tourAd.id}`)}
                  >
                    {tourAd.id}
                  </th>
                  <td
                    onClick={() => history.push(`/tours/${tourAd.id}`)}
                  >
                    <span className="text-overflow-1">{tourAd.title}</span>
                  </td>
                  <td
                    onClick={() => history.push(`/tours/${tourAd.id}`)}
                  >
                    <span className="text-overflow-1">{tourAd.image_main}</span>
                  </td>
                  <td
                    onClick={() => history.push(`/tours/${tourAd.id}`)}
                  >
                    {tourAd.duration_day}
                  </td>
                  <td
                    onClick={() => history.push(`/tours/${tourAd.id}`)}
                  >
                    {tourAd.prices}
                  </td>
                  <td>
                    <button onClick={() => remove_tour(tourAd.id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => history.push(`/tours/${tourAd.id}/pictures`)}
                    >
                      + Add Img
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
}
