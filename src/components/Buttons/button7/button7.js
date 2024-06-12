import React from 'react'
import './button7.css';
export default function Button7(props) {
  // console.log(props.disabled)
  return (
    <button type={props.type} disabled={props.disabled} className="btn btn-5 border-0 shadow-none" ><span>{props.name}</span></button>
  )
}
