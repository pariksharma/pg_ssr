import React, { useState } from 'react';
import './about_iits.css';
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import About_iits_assets from './about_iits_assets.js';
import Header from '../../../components/header/header';
import LinkSend from '../../../components/linkSend/linkSend';
import Footer from '../../../components/footer/footer';

const Banner_img = '/assets/IIT_images/about-banner.jpg';

const About_iits = () => {
  const navigate = useNavigate();
  const [iitParam, setIitParams] = useSearchParams();

  const handleIITRoutes = (value) => {
    // iitParam.set('iit',value);
    // setIitParams(iitParam);
    console.log('value', value)
    navigate({
      pathname: '/iits',
      search: `?name=${value}`
    })
  }
  return (
    <>
      <Header />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="about-banner px-0">
              <img
                src={Banner_img}
                alt="pgaboutbanner"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-4 ">
        <div className="container">
          <header className="my-3 pb-3">
            <h1 className="text-warning fw-bold">About IITs</h1>
            <p className="text-dark">
              <b>Joint Entrance Examination – Advanced (JEE-Advanced)</b> (formerly
              the
              <b>
                Indian Institute of Technology - Joint Entrance Examination (IIT-JEE)
              </b>
              ), is an academic examination held annually in India. It is organized by
              one of the seven zonal IITs (IIT Roorkee, IIT Kharagpur, IIT Delhi, IIT
              Kanpur, IIT Bombay, IIT Madras, and IIT Guwahati) under the guidance of
              the <b>Joint Admission Board (JAB)</b> on a round-robin rotation pattern
              for the qualifying candidates of the JEE-Main.
            </p>
          </header>
          <div className="row">
            {
              About_iits_assets.map((item, i) => {
                return (
                  <div className="col-lg-3 col-md-4 col-12" key={i}>
                    <div onClick={() => handleIITRoutes(item.to)} style={{ textDecoration: "none" }} className='cursor'>
                      <div className="pg-aboutiits-sec d-flex align-items-center justify-content-between">
                        <div className="about-icons py-3">
                          <img src={item.img} alt={item.text} />
                        </div>
                        <div className="about-iit-title">
                          <h3 className="title">{item.text}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      <LinkSend />
      <Footer />

    </>
  )
}

export default About_iits;