import React from 'react'
import './reviewSection.css'
{/*
// import Reivew10 from '../../../assets/images/r1.png'
// import Reivew1 from '../../../assets/images/r2.png'
// import Reivew2 from '../../../assets/images/r3.png'
// import Reivew3 from '../../../assets/images/r4.png'
// import Reivew4 from '../../../assets/images/r5.png'
// import Reivew5 from '../../../assets/images/r6.png'
// import Reivew6 from '../../../assets/images/r7.png'
// import Reivew7 from '../../../assets/images/r8.png'
// import Reivew8 from '../../../assets/images/r9.png'
// import Reivew9 from '../../../assets/images/r10.png'
import Reivew11 from '../../../assets/images/r11.png'
import Reivew12 from '../../../assets/images/r12.png'
import Reivew13 from '../../../assets/images/r13.png'
import Reivew14 from '../../../assets/images/r14.png'
import Reivew15 from '../../../assets/images/r15.png'
import Reivew16 from '../../../assets/images/r16.png'
import Reivew17 from '../../../assets/images/r17.png'
import Reivew18 from '../../../assets/images/r18.png'
import Reivew19 from '../../../assets/images/r19.png'
import Reivew20 from '../../../assets/images/r20.png'

*/}

export default function ReviewSection() {
    return (

        <section id="reviews" className="pt-1 pb-4 bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className=" col-lg-5">
                        <div className="pg-reviews">
                            <div className="text-center">
                                {/* Tons of positive reviews by students across our platforms */}
                                <h1 className="fw-bold">Lakhs of <span className="text-warning">students</span> &amp; their <span className="text-warning">parents</span> nationwide place their trust in us.</h1>
                                <p className=" text-muted"><span className="text-warning font-weight-bold">Tons</span> of positive reviews by students across our platforms</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 animation_main5">
                        <div className='p-2 check_animation5'>
                            {review.map((item, i) => {
                                return (
                                    <div className="review_img my-3" key={i}>
                                        <img src={item} alt="revie1" className="img-fluid" />
                                    </div>
                                )
                            })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}


const review = [
    // '/assets/images/r1.png',
    // '/assets/images/r2.png',
    // '/assets/images/r3.png',
    // '/assets/images/r4.png',
    // '/assets/images/r5.png',
    // '/assets/images/r6.png',
    // '/assets/images/r7.png',
    // '/assets/images/r8.png',
    // '/assets/images/r9.png',
    // '/assets/images/r10.png',

    '/assets/images/r11.png',
    '/assets/images/r12.png',
    '/assets/images/r13.png',
    '/assets/images/r14.png',
    '/assets/images/r15.png',
    '/assets/images/r16.png',
    '/assets/images/r17.png',
    '/assets/images/r18.png',
    '/assets/images/r19.png',
    '/assets/images/r20.png',
]