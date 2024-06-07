import React from 'react'
import './button5.css';
export default function Button5(props) {
  // console.log(props.disabled)
  return (
    <button type={props.type} disabled={props.disabled} className="btn btn-5 border-0 shadow-none" onClick={(e) => props.onButtonClick(e)} ><span>{props.name}</span></button>
  )
}
