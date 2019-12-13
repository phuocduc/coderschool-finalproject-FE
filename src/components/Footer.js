import React from 'react'
import '../assets/css/footer.css'

export default function Footer() {
    return (
        <div className="footer-basic">
        <footer>
            <div className="social"><a href="#"><i className="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#">Home</a></li>
                <li className="list-inline-item"><a href="#destination">Destinations</a></li>
                <li className="list-inline-item"><a href="#feedback">Feedback</a></li>
                <li className="list-inline-item"><a href="#service">Services</a></li>
            </ul>
            <p className="copyright">Mr Duc © 2019</p>
        </footer>
    </div>
    )
}
