import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import '../assets/css/updateTour.css'

export default function UpdateTour() {
    const [tour, setTour] = useState({})
    const [tourEdit, setTourEdit] = useState(null)
    const param = useParams()
    const history = useHistory()
    const getTourInfo = async () =>{
        const res = await fetch(`https://127.0.0.1:5000/tours/${param.id}`,{
            method:'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          const data = await res.json()
          setTour(data)
          setTourEdit({
            title:data.title,
            image_main:data.image_main,
            prices:data.prices,
            content:data.content,
            description:data.description,
            status:data.status,
            duration_day:data.duration_day,
        })
    }

    useEffect(()=>{
        getTourInfo()
    },[])


    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res = await fetch(`https://127.0.0.1:5000/tours/${param.id}`,{
            method:"POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tourEdit)
          })
        const data = await res.json()
        if (data.state === "success_change")
        {
            alert("change success")
            history.push("/dadmin")
            window.location.reload(false)
        }
      }
    
    
    const change = e =>{
        setTourEdit({
        ...tourEdit, [e.target.name]:e.target.value
        })
    }
    
    
    return (
        <div className="d-flex justify-content-center form-color">
            <form className="form-row d-flex justify-content-center form-updateTour_first" onSubmit={e=>handleSubmit(e)} onChange={e=>change(e)}>
                <div className="form-group form-updateTour_second">
                    <h1 className="text-center">Change Tour Information</h1>
                        <label>Tour Name</label>
                            <input type="text" name="title" className="form-control"  defaultValue={tour.title}                          />
                        <label>Url Image</label>
                            <input type="text" name="image_main" className="form-control" defaultValue={tour.image_main}
                            />
                        <label>Content</label>
                            <input type="text" name="content" className="form-control" defaultValue={tour.content}
                            />
                        <label>Description</label>
                            <input type="text" name="description" className="form-control" defaultValue={tour.description}
                            />
                        <label>Duration Day</label>
                            <input type="number" name="duration_day" className="form-control" defaultValue={tour.duration_day}
                            />
                        <label>Price</label>
                            <input type="number" name="prices" className="form-control" defaultValue={tour.prices}
                            />
                        <label>Status</label>
                        <select className="custom-select" name="status">
                            <option value="Ready">Ready</option>
                            <option value="Comming">Comming</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <button type="submit" className="btn btn-primary m-3">Update Tour</button>
                </div>
            </form>
        </div>
    )
}
