import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import '../assets/css/updateTour.css'

export default function UpdateImages() {
    const [tourImg, setTourImg] = useState(null)
    const [getImages, setGetImage] = useState({})
    const param = useParams()
    console.log('sfds', tourImg)
    const history = useHistory()
    const getTourImages = async () =>{
        const res = await fetch(`https://127.0.0.1:5000/pictures/${param.id}`,{
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        const data = await res.json()
        setGetImage(data.image)
        setTourImg({
            img_first: data.image.img_first,
            content_first: data.image.content_first,
            img_second: data.image.img_second,
            content_second: data.image.content_second,
            img_third: data.image.img_third,
            content_third: data.image.content_third
        })
    }

    useEffect(()=>{
        getTourImages()
    },[])


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res = await fetch(`https://127.0.0.1:5000/pictures/${param.id}`,{
            method: "POST",
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(tourImg)
        })
        const data = await res.json()
        if (data.state == "success")
        {
            alert("update tour detail done")
            history.push(`/tours/${data.tour_id}/pictures`)
        }
    }

    
    const change = e =>{
        setTourImg({
            ...tourImg, [e.target.name] : e.target.value
        })
    }

    return (
        <div className="d-flex justify-content-center form-color">
        <form className="form-row d-flex justify-content-center form-updateTour_first" onSubmit={e=>handleSubmit(e)} onChange={e=>change(e)}>
            <div className="form-group form-updateTour_second">
                <h1 className="text-center">Change Images Information</h1>
                
               
                     <label>Url Image</label>
                        <input type="text" name="img_first" className="form-control" defaultValue={getImages.img_first}/>
              
                     <label>Content 1st Image</label>
                        <input type="text" name="content_first" className="form-control" defaultValue={getImages.content_first}/>
              
                     <label>Url Image</label>
                        <input type="text" name="img_second" className="form-control" defaultValue={getImages.img_second}/>
              
                     <label>Content 2nd Image</label>
                        <input type="text" name="content_second" className="form-control" defaultValue={getImages.content_second}/>
              
              
                     <label>Url Image</label>
                        <input type="text" name="img_third" className="form-control" defaultValue={getImages.img_third}/>
              
                     <label>Content 3rd Image</label>
                        <input type="text" name="content_third" className="form-control" defaultValue={getImages.content_third}/>
                        <button type="submit" className="btn btn-primary m-3">Update Image Info</button>
            </div>
        </form>
    </div>
    )
}
