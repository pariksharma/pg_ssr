import React, { useState, useEffect } from 'react'
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
import CoursesOrder from '../containers/coursesOrder/coursesOrder'
import Login from '../containers/login/login'
import ForgetPassword from '../containers/forgetPassword/forgetPassword'
import ChangePassword from '../containers/changePassword/changePassword'
import Profile from '../containers/profile/profile'
import Library from '../containers/library/library'
import PurchaseHistory from '../containers/purchaseHistory/purchaseHistory'
import NotificationTab from '../containers/notificationTab/notificationTab'
import LiveTest from '../containers/liveTest/liveTest'
import LiveClasses from '../containers/liveClasses/liveClasses'
import CCDetails from '../containers/viewDetail/CCDetails'
import BookDetails from '../containers/bookDetails/bookDetails'
import CartDetails from '../containers/cartDetail/cartDetails'
import LandingPage from '../containers/landingPage/landingPage'



function PrivateRoute({ children, redirectTo }) {
  if (typeof window !== 'undefined') {
    const jwt = localStorage.getItem("jwt");
    if (!jwt && typeof window !== 'undefined') {
      const fullUrl = window.location.href;
      localStorage.setItem('redirect', fullUrl);
      return <Navigate to={redirectTo} />;
    }
  return jwt ? children : null;
  }
}

function PublicRoute({ children, redirectTo }) {
  if (typeof window !== 'undefined') {
    const jwt = localStorage.getItem('jwt');
    return !jwt ? children : <Navigate to={redirectTo} />;
  }
} 



const Routing = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mentorship-for-jee-neet-2025' element={<LandingPage />} />

        {/* Login and Signup Routes */}
        <Route path='/login' element={<PublicRoute redirectTo={'/'} ><Login /></PublicRoute>} />
        <Route path='/forget_password' element={<PublicRoute redirectTo={'/'} ><ForgetPassword /></PublicRoute>} />
        <Route path='/signup' element={<PublicRoute redirectTo={'/'} ><SignUp /></PublicRoute>} />

        {/* Routes works after login */}
        <Route path='/change_password' element={<PrivateRoute redirectTo={'/login'} ><ChangePassword /></PrivateRoute>} />
        <Route path='/coursesorder' element={<PrivateRoute redirectTo={"/login"}><CoursesOrder /></PrivateRoute>} />
        <Route path='/user-profile' element={<PrivateRoute redirectTo={"/login"}><Profile /></PrivateRoute>} />
        <Route path='/library' element={<PrivateRoute redirectTo={"/login"}><Library /></PrivateRoute>} />
        <Route path='/purchasehistory' element={<PrivateRoute redirectTo={"/login"}><PurchaseHistory /></PrivateRoute>} />
        <Route path='/notifications' element={<PrivateRoute redirectTo={"/login"}><NotificationTab /></PrivateRoute>} />
        <Route path='/livetest' element={<PrivateRoute redirectTo={"/login"}><LiveTest /></PrivateRoute>} />
        <Route path='/liveclasses' element={<PrivateRoute redirectTo={"/login"}><LiveClasses /></PrivateRoute>} />

        {/* Cart Route */}
        <Route path='/my-cart' element={<PrivateRoute redirectTo={"/login"}><CartDetails /></PrivateRoute>} />

        {/* Course Details Routes */}
        <Route path='/view_details' element={<ViewDetail />} />
        <Route path='/cc_details' element={<CCDetails />} />
        <Route path='/allcourses' element={<AllCourses />} />
        <Route path='/ourcourses' element={<OurCourses />} />
        <Route path='/bookdetails/:id' element={<BookDetails />} />
        <Route path='/booksummery' element={<BookSummery />} />
        <Route path='*' element={<NotFound />} />

        {/* IITs Routes */}
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/iits' element={<IitSideBar />} />
        <Route path='/about-iits' element={<About_iits />} />

        {/* Footer link Routes */}
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/refund-policies' element={<RefundPolicy />} />
        <Route path='/termcondition' element={<TermCondition />} />

        {/* Events Routes */}
        <Route path='/events' element={<EventList />} />
      </Routes>
    </>
  )
}

export default Routing