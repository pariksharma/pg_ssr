import React from 'react'
import "./noDataFound.css"

const NodataImage = '/assets/images/nodtaimg.png'
export default function NoDataFound(props) {
  return (
    <div className='pg-no-data-found mt-2'>
      <div className='nodataimg' style={{ height: props.height }}>
        <img src={NodataImage} />
        <p>Sorry! No Data Found</p>
      </div>
    </div>
  )
}
