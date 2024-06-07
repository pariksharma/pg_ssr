import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../containers/home/home'


const Routing = () => {

  


  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />

            {/* <Route path='/view_details' element={<ViewDetail />} /> */}
            {/* <Route path='/allcourses' element={<AllCourses />} />
            <Route path='/ourcourses' element={<OurCourses />} />
            <Route path='/booksummery' element={<BookSummery />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/about-iits' element={<About_iits />} /> */}

            {/* IITs Routes */}
            {/* <Route path='/thank-you' element={<ThankYou />} />
            <Route path='/iits' element={<IitSideBar />} />


            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/privacypolicy' element={<PrivacyPolicy />} />
            <Route path='/refund-policies' element={<RefundPolicy />} />
            <Route path='/termcondition' element={<TermCondition />} /> */}
        </Routes>
        {/* <h1>Hello</h1> */}
    </>
  )
}

export default Routing