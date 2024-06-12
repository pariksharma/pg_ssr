import React from 'react'
import Modal from '../../components/modal/modal'

import "./thankyouModal.css"
import toast from 'react-hot-toast';

const ios_image = "/assets/images/ios.png";
const vedio_app = '/assets/images/videocourse.jpg';
// const thankyou = "./images/thankyou-gif.gif";

export default function ThankyouModal({ ModalOpen, CloseModal }) {
    return (
        <Modal isOpen={ModalOpen} onClose={() => CloseModal()}>
            <div className="row d-flex align-items-center justify-content-center">
                {/* <!-- Left side content --> */}
                <div className="col-lg-7 col-md-7">
                    <div className="video_app_content">
                        {/* <img src={thankyou} className="w-50" /> */}
                        <h2 className='text-center'>Thank You!</h2>
                        <p>Your course details will be sent directly to your registered email id. Don't forget to check your spam folder as well.
                        </p>
                        <h5>Download the Physics Galaxy App to access the course content.</h5>
                        <h4>Available on all platforms</h4>
                        <div className="row">
                            <div className="col-md-10">
                                <div className="downl_btn marg_con d-flex justify-content-between  text-center">
                                    <a onClick={() => window.open('https://play.google.com/store/search?q=physics+galaxy&c=apps&hl=en-IN&pli=1')} target="_blank" className="app-img p-1">
                                        <img
                                            src="https://www.codesquadz.com/education_staging/../website_assets/img/app-edu-android-app.png"
                                            alt="app-edu-android-app"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <a onClick={() => window.open('https://apps.apple.com/in/app/physics-galaxy/id1305855812')} target="_blank" className="app-img p-1">
                                        <img
                                            src={ios_image}
                                            alt="app-edu-ios-app"
                                            className="img-fluid"
                                        />
                                    </a>
                                    {/* <a target="_blank" className="app-img p-1">
                                            <img
                                                src="https://www.codesquadz.com/education_staging/../website_assets/img/app-edu-windows-app(1).png"
                                                alt="app-edu-windows-app"
                                                className="img-fluid"
                                            />
                                        </a> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <!-- Right side image --> */}
                <div className="col-lg-5 col-md-5 mx-auto">
                    <div className="video_app_image text-center">
                        <img src={vedio_app} alt="app_img" />
                    </div>
                </div>

            </div>
        </Modal>
    )
}
