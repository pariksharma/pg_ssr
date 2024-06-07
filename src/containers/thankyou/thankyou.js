import React from 'react'
import './thankyou.css'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
// import galaxylogo from "./images/galaxy-logo.png";

const logo = '/assets/images/galaxy-logo.png'
const check = '/assets/images/icons/check.webp'


export default function Thankyou() {
    return (
        <>
            <section className="page-section-1 pb-4">
                <div className="page-header shadow bg-black">
                    <div className="container">
                        <div className="header-title p-1 ">
                            <img src={logo} alt="Physics Galaxy" />
                        </div>
                    </div>
                </div>
            </section>
            {/* <header className="iqra-header">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="logo p-2">
                            <img src={logo} className="iqrancertfoundation" />
                        </div>
                    </div>
                </div>
            </header> */}

            <section className="educrypt-thankypu-section pt-3 pb-3" id="thank">
                <div className="container">
                    <div className="educrypt-thanks-card">
                        <div className="text-center mx-auto educrypt-logo">
                            <img className="mt-2 " src={check} alt="right check" />
                        </div>
                        <div className="text-center py-3 educrypt-thank-title">
                            {/* <h1>Thank you!</h1>
                            <h5>We'll get back to you soon.</h5> */}
                            <h1 className="text-black">Thank You! </h1>
                            <h5>Your course details will be sent directly to your email id. Don't forget to check your spam
                                folder as well.</h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-center py-2 educrypt-thank-btn">
                            <a href="/mentorship-for-pyq-talks-2025"
                                className="btn btn-dark btn-lg preButton shadow-none customborder py-2 px-4 m-2 font400">Back</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <footer className="iqra-footer" id="footer">
                <div className="container">
                    <div className="p-3 text-center">
                        <p className="mb-0">© 2023 IQRA IAS Academy for Civil Service</p>
                    </div>
                </div>
            </footer> */}
            <footer>
                <div className="page-footer page-footer-2 shadow bg-black p-2">
                    <div className="footer-title text-center p-1 ">
                        © 2024
                        <a href="">Physics Galaxy</a>.
                        All rights reserved.
                    </div>
                </div>



                <div className="footer-btn-sticky shadow bg-black p-3">
                    <div className="leftside-btn">
                        <a type="button" href="#" className="btn btn-lg btn-enroll " data-bs-toggle="modal"
                            data-bs-target="#buynow">ENROLL NOW </a>
                    </div>
                </div>
            </footer>
        </>

    )
}
