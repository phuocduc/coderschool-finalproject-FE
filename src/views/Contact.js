import React from 'react'
import Navibar from '../components/Navibar'


export default function Contact(props) {
    return (
        <div>
        <Navibar user={props.user} token={props.token} setUser = {props.setUser}/>
        contact
        </div>
    )
}
