import React, { useState, useEffect } from "react";
import "../assets/css/tourItem.css";
import { useParams, useHistory } from "react-router-dom";
import {useAlert} from 'react-alert'

export default function ImageTour() {
  const [tourImg, setTourImg] = useState({});
  const [getTourItems, setGetTourItem] = useState([]);
  const param = useParams();
  const history = useHistory();
  const alert = useAlert()
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/tours/${param.id}/pictures`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tourImg)
      }
    );
    if (res.status !== 200) return;
    const data = await res.json();
    if (data.state === "success") {
      alert.show("add success information",{
        type:'success'
      });
      getTourImage(param.id);
    }
  };

  const getTourImage = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/tours/${param.id}/pictures`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    const data = await res.json();
    setGetTourItem(data.Image);
  };

  useEffect(() => {
    getTourImage();
  }, []);

  const remove_tourItem = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/pictures/${param.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    if (data.state === "success") {
      alert.show("delete success");
      getTourImage();
    }
  };

  return (
    <div>
    <div className="container-fluid tourInfo-body">
      <div className="d-flex justify-content-center flex-row align-items-center tourInfo-wrapper">
        <h1 className="text-center mb-5 title-productInfo">
          Add Tour Image
        </h1>
        <form
          className="form-admin d-flex justify-content-center flex-column align-items-center tourInfoForm"
          method="POST"
          onSubmit={e => handleSubmit(e)}
        >
          <div className="form-group tour-form-child">
            <input
              className="form-control"
              type="text"
              name="img_first"
              placeholder="URL..."
              onChange={e =>
                setTourImg({ ...tourImg, img_first: e.target.value })
              }
            />
          </div>
          <div className="form-group tour-form-child">
            <input
              className="form-control"
              type="text"
              name="content_first"
              placeholder="Content for first image ...."
              onChange={e =>
                setTourImg({ ...tourImg, content_first: e.target.value })
              }
            />
          </div>
          <div className="form-group tour-form-child">
            <input
              className="form-control"
              type="text"
              name="img_second"
              placeholder="URL..."
              onChange={e =>
                setTourImg({ ...tourImg, img_second: e.target.value })
              }
            />
          </div>
          <div className="form-group tour-form-child">
            <input
              className="form-control"
              type="text"
              name="content_second"
              placeholder="Content for second image ...."
              onChange={e =>
                setTourImg({ ...tourImg, content_second: e.target.value })
              }
            />
          </div>
          <div className="form-group tour-form-child">
            <input
              className="form-control"
              type="text"
              name="img_third"
              placeholder="URL..."
              onChange={e =>
                setTourImg({ ...tourImg, img_third: e.target.value })
              }
            />
          </div>
          <div className="form-group tour-form-child">
            <input
              className="form-control"
              type="text"
              name="content_third"
              placeholder="Content for third image ...."
              onChange={e =>
                setTourImg({ ...tourImg, content_third: e.target.value })
              }
            />
          </div>
         
          <div className="form-group mt-5">
            <button className="btn btn-primary btn-block" type="submit">
              Add Tour Image
            </button>
          </div>
        </form>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Content</th>
            <th scope="col">Image URL</th>
          </tr>
        </thead>
        {getTourItems &&
          getTourItems.map(tourItem => {
            return (
              <tbody key={tourItem.id}>
                <tr>
                  <th
                    scope="row"
                  >
                    {tourItem.id}
                  </th>
                  <td
                  >
                    {tourItem.content_first}
                  </td>
                  <td>
                  <div className="text-overflow-1">
                    {tourItem.img_first}
                    </div>
                  </td>
               
         
                  <td>
                    <button onClick={() => remove_tourItem(tourItem.id)}>
                      Delete
                    </button>


                    <button
                      onClick={() =>
                        history.push("/pictures/" + tourItem.id)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
    </div>
  );
}
