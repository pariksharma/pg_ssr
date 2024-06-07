import React from 'react'
import './authSection.css'
import { Link } from 'react-router-dom'
import Header from '../header/header'
import Footer from '../footer/footer'

const LoginImg1 = '/assets/images/login-1.png'
const LoginImg2 = '/assets/images/login-2.png'
const LoginImg3 = '/assets/images/login-3.png'
export default function AuthSection(props) {
  const options = {
    loop: true,

    items: 1,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 3000,
    smartSpeed: 400,
    // nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };
  return (
    <>
      <Header />
     
      <Footer />
    </>
  )
}
