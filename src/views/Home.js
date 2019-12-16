import React from "react";
import Navibar from "../components/Navibar";
import headerBg from "../assets/img/header-bg.jpg";
import foodImg from "../assets/img/food-2.jpg";
import tourImg from "../assets/img/tour-2.jpg";
import historyImg from "../assets/img/history-2.jpg";
import feedback1 from "../assets/img/1.jpg";
import feedback2 from "../assets/img/2.jpg";
import feedback3 from "../assets/img/3.jpg";
import climb_mountain from "../assets/img/climb_mountain.jpg";

import "../assets/css/home.css";
import TravelStatic from "../components/TravelStatistic";
import Footer from "../components/Footer";

export default function Home(props) {
  return (
    <div>
      <Navibar user={props.user} setUser={props.setUser} token={props.token} />

      <header
        className="masthead"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="container">
          <div className="intro-text">
            <div id="div8" className="intro-lead-in">
              <span>
                According to Unesco, "There are 8 Amazing World Heritage Sites
                in Vietnam"
              </span>
            </div>
            <div className="intro-heading text-uppercase">
              <span></span>
            </div>
            <a
              className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
              role="button"
              href="/destinations" id="destination"
            >
              Begin Your Adventure
            </a>
          </div>
        </div>
      </header>
      {/* part 2 */}
      <div className="article-list">
        <div className="container">
          <div className="intro">
            <h2 className="text-center">
              The Reason Why You Should Visit Vietnam
            </h2>
            <p className="text-center">
              Vietnam is getting more and more popular nowadays as one of the
              most worth-exploring travel destinations in Southeast Asia.
            </p>
          </div>
          <div className="row articles">
            <div className="col-sm-6 col-md-4 item">
              <a href="#">
                <img className="img-fluid" src={foodImg} />
              </a>
              <h3 className="name">Diverse dishes</h3>
              <p className="description">
                Vietnamese food is simple but charming and delicate, which makes
                diners around the world fascinated.
              </p>
            </div>
            <div className="col-sm-6 col-md-4 item">
              <a href="#">
                <img className="img-fluid" src={historyImg} />
              </a>
              <h3 className="name">History</h3>
              <p className="description">
                More than 3,000 years of building and defending the country,
                Vietnam is an important part of the history of the world.
              </p>
            </div>
            <div className="col-sm-6 col-md-4 item">
              <a href="#">
                <img className="img-fluid" src={tourImg} />
              </a>
              <h3 className="name">Spectacular natural scenery</h3>
              <p className="description">
                From the jungle to the largest natural cave in the world, nature
                offers many beautiful scenery to Vietnam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* part 3*/}

      <TravelStatic />

      {/* part 4 */}

      <div
        className="services-img mt-5" id="service"
        style={{ backgroundImage: `url(${climb_mountain})` }}
      >
        <div className="cover-text-mountain text-light">
            <h2 className="p-2 text-mountain">
              We deliver greate expericences and highly quality services to you
            </h2>
        </div>
      </div>
      {/* part 5 */}

      <div className="testimonials-clean">
        <div className="container">
          <div className="intro">
            <h2 className="text-center" id="feedback">Testimonial</h2>
            <p className="text-center">
              Our customers love us! Read what they have to say below. Aliquam
              sed justo ligula. Vestibulum nibh erat, pellentesque ut laoreet
              vitae.
            </p>
          </div>
          <div className="row people">
            <div className="col-md-6 col-lg-4 item">
              <div className="box">
                <p className="description">
                  I love to booking tour on this page.
                </p>
              </div>
              <div className="author">
                <img className="rounded-circle" src={feedback1} />
                <h5 className="name">Happy Polla</h5>
                <p className="title">CEO of Company Inc.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 item">
              <div className="box">
                <p className="description">
                  Good.......
                </p>
              </div>
              <div className="author">
                <img className="rounded-circle" src={feedback3} />
                <h5 className="name">Ku Bin</h5>
                <p className="title">Founder of Style Co.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 item">
              <div className="box">
                <p className="description">
                 Ngon lành
                </p>
              </div>
              <div className="author">
                <img className="rounded-circle" src={feedback2} />
                <h5 className="name">Thảo Mai</h5>
                <p className="title">Owner of Creative Ltd.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* part footer*/}

      <Footer />

    </div>
  );
}
