import React from 'react'
import "./noDataFoundNew.css"
import { useNavigate } from 'react-router-dom';

const NodataImage = '/assets/images/nodtaimg.png'

export default function NoDataFoundNew(props) {
  const navigate = useNavigate();
  return (
    <div className='pg-no-data-found mt-2'>
      <div className='nodataimg' style={{ height: props.height }}>
        <img src={NodataImage} />
        <p>No Courses Found !<br></br>
          <span>Don't miss out, Start exploring our courses!</span>
        </p>
        <button onClick={() => navigate('/allcourses')}>Explore Courses</button>
      </div>
    </div>
  )
}
