import React from 'react'
import './card2.css'
import Button4 from '../../../components/Buttons/button4/button4'

const ComboImage = '/assets/images/cg-1.png'

export default function Card2({ data }) {
  return (
    <>
      <div className='col-md-4'>
        <div className='card combocourse-card pg-cg-card border'>
          <div className='image-size'>
            <img src={data.cover_image} className="card-img-top" alt="..." />
          </div>
          <div className='card-body'>
            <div className="pg-cg-c-title mb-3"><h5 className="card-title vjed-card-title">
              {data.title}
            </h5>
              <h6>
                {data.segment_information}
              </h6></div>
            <div className=" text-center p-1"><Button4 name={"View Details"} /></div>
          </div>
        </div>
      </div>

    </>
  )
}
