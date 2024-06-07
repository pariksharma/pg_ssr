import React, { useState, useEffect }  from 'react'
import { getCourse_Catergory_Service } from '../../services';
import Banner from '../../components/Banner/banner';
import Carousel1 from '../../components/Carousel/carousel';
import './home.css'
import ReviewSection from './reviewSection/reviewSection';
import WhyChoose from './whyChoose/whyChoose';
import Carousel3 from '../../components/Carousel3/carousel3';
import LinkSend from '../../components/linkSend/linkSend';
import Footer from '../../components/footer/footer';
import IItSection from './iitSection/iitSection';
import CounterSection from './counterSection/counterSection';
import BestSellar from './bestSeller/bestSeller';
import Header from '../../components/header/header';
import ExamSection from '../../components/examSection/examSection';

const Home = () => {
    
  const [bannerImages, setBannerImages] = useState([])

  useEffect(() => {
    getCourse_Catergory_Service().then((res) => {
    console.log('res', res.data.data);
    let status = res.data.status;
    status && setBannerImages(res.data.data.banner_list_web);
  })}, []);

  return (
    <>
        <Header />
        <Banner images = {bannerImages} />
        <Carousel1 />
        <ExamSection />
        {/* <BestSellar /> */}
        {/* <CounterSection /> */}
        {/* <IItSection /> */}
        <ReviewSection />
        <WhyChoose />
        <Carousel3 heading={"Testimonials"} />
        <LinkSend />
        <Footer />
    </>
  )
}

export default Home