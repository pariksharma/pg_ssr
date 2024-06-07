import React from 'react'
import ReactRotatingText from 'react-rotating-text';
import { Link } from 'react-router-dom';
export default function CarouselItem({ value }) {
  return (
    <div className="item">
      <div className="card m-3 shadow border-0 pg-hdstaf-card" style={{ borderRadius: '20px' }}>
        <div className="row g-0 d-flex align-items-center justify-content-center">

          <div className="col-md-8">
            <div className="card-body pg-card-body p-1 ms-4">

              <h1 className="fw-bold">LEARN FROM {" "}
                <ReactRotatingText className="txt-rotate" items={[`${value.name}`]} />
                {/* <span className="txt-rotate" data-period="1000" data-rotate='["ASHISH ARORA SIR"]'></span> */}
              </h1>

              <p className="card-text "><i className="fa fa-star me-2 mt-1 text-warning" aria-hidden="true"></i> <span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_1.substring(0, value.text_1.indexOf('&'))}</span> {value.text_1.substring(value.text_1.indexOf('&'), value.text_1.indexOf('130'))}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_1.substring(value.text_1.indexOf('130'), value.text_1.indexOf('in'))}</span>{value.text_1.substring(value.text_1.indexOf('in'), value.text_1.length)}</p>
              <p className="card-text "><i className="fa fa-star me-2 mt-1 text-warning" aria-hidden="true"></i> <span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_2.substring(0, value.text_2.indexOf('IIT'))}</span> {value.text_2.substring(value.text_2.indexOf('IIT'), value.text_2.indexOf('15,0'))}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_2.substring(value.text_2.indexOf('15,0'), value.text_2.indexOf('Med'))}</span>{value.text_2.substring(value.text_2.indexOf('Med'), value.text_2.length)}</p>
              <p className="card-text "><i className="fa fa-star me-2 mt-1 text-warning" aria-hidden="true"></i> <span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_3.substring(0, value.text_3.indexOf('of'))}</span>{value.text_3.substring(value.text_3.indexOf('of'), value.text_3.length)}</p>
              <p className="card-text "><i className="fa fa-star me-2 mt-1 text-warning" aria-hidden="true"></i> <span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_4.substring(0, value.text_4.indexOf('of'))}</span>{value.text_4.substring(value.text_4.indexOf('of'), value.text_4.indexOf('Mri'))}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_4.substring(value.text_4.indexOf('Mri'), value.text_4.length)}</span></p>
              <p className="card-text "><i className="fa fa-star me-2 mt-1 text-warning" aria-hidden="true"></i> {value.text_5.substring(0, value.text_5.indexOf('AIR'))}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_5.substring(value.text_5.indexOf('AIR'), value.text_5.indexOf('in'))}</span>{value.text_5.substring(value.text_5.indexOf('in'), value.text_5.indexOf('Dun'))}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_5.substring(value.text_5.indexOf('Dun'), value.text_5.length)}</span></p>
              <p className="card-text "><i className="fa fa-star me-2 mt-1 text-warning" aria-hidden="true"></i> {value.text_6.substring(0, value.text_6.indexOf('AIR'))}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_6.substring(value.text_6.indexOf('AIR'), value.text_6.indexOf('IIT')-3)}</span>{value.text_6.substring(value.text_6.indexOf('IIT')-3, value.text_6.indexOf('Nav'))}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_6.substring(value.text_6.indexOf('Nav'), value.text_6.length)}</span></p>
              <p className="card-text "><i className="fa fa-star me-2 mt-1 text-warning" aria-hidden="true"></i> <span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_7.substring(0, value.text_7.indexOf('Int'))}</span>{value.text_7.substring(value.text_7.indexOf('Int'), value.text_7.indexOf('She'))}{" "}<span style={{color: 'blue', fontWeight: 'bold'}}>{value.text_7.substring(value.text_7.indexOf('She'), value.text_7.length)}</span></p>
              <p className="card-text fst-italic"><i className="fa fa-quote-left me-2 text-warning fw-bold" aria-hidden="true" ></i>{value.message}<i className="fa fa-quote-right ms-2 text-warning fw-bold" aria-hidden="true" ></i></p>
              <h4 className="text-dark pg-mented">
                <span >Mentor of</span>
                <span className="fw-bold pg-prep"> {value.channel_name}</span>
                <span ><Link to={value.channel_url}> Youtube channel: <i className="fa fa-youtube-play ms-2 text-danger" aria-hidden="true" ></i></Link></span>
              </h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-img">
              <img src={value.image} className="img-fluid" alt="ashish arora sir" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
