import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../containers/home/home'
import ThankYou from '../containers/thankyou/thankyou'
import IitSideBar from '../containers/IitPage/IitSideBar/IitSideBar'
import AboutUs from '../containers/aboutUs/aboutUs'
import PrivacyPolicy from '../containers/privacyPolicy/privacyPolicy'
import RefundPolicy from '../containers/refundPolicy/refundPolicy'
import TermCondition from '../containers/termCondition/termCondition'
import AllCourses from '../containers/allCourses/allCourses'
import OurCourses from '../containers/ourCourses/ourCourses'
import BookSummery from '../containers/bookSummery/bookSummery'
import NotFound from '../containers/notFound/notFound'
import About_iits from '../containers/IitPage/about/about_iits'
import ViewDetail from '../containers/viewDetail/viewDetail'
import EventList from '../containers/eventList/eventList'
import SignUp from '../containers/signUp/signUp'



const Routing = () => {

  // function PrivateRoute({ children, redirectTo }) {
  //   let isLogin = localStorage?.getItem("jwt");
  //   if (isLogin) {
  //     return children
  //   }
  //   else {
  //     const fullUrl = window.location.href;
  //     localStorage.setItem('redirect', fullUrl);
  //     return <Navigate to={redirectTo} />
  //   }

  // }

  // function PublicRoute({ children, redirectTo }) {
  //   let isLogin = localStorage?.getItem("jwt");
  //   return !isLogin ? children : <Navigate to={redirectTo} />;
  // }  


  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/signup' element={<SignUp />} />

            <Route path='/view_details' element={<ViewDetail />} />
            <Route path='/allcourses' element={<AllCourses />} />
            <Route path='/ourcourses' element={<OurCourses />} />
            <Route path='/booksummery' element={<BookSummery />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/about-iits' element={<About_iits />} />

            {/* IITs Routes */}
            <Route path='/thank-you' element={<ThankYou />} />
            <Route path='/iits' element={<IitSideBar />} />


            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/privacypolicy' element={<PrivacyPolicy />} />
            <Route path='/refund-policies' element={<RefundPolicy />} />
            <Route path='/termcondition' element={<TermCondition />} />
            <Route path='/events' element={<EventList />} />
        </Routes>
        {/* <h1>Hello</h1> */}
    </>
  )
}

export default Routing