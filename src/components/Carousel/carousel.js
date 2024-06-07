import React, { useState } from 'react'
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from './carouselItem';
import './carousel.css'
// import AAheader from '/assets/images/AAhearder.jpg'

const Carousel1 = () => {
    const [carouselData, setCarouselData] = useState(data);
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  return (
    <>
      <section className="pg-card">
        <div className="container">
          <div className="row scndcrusol">
            {/* <ReactOwlCarousel   {...options}>
              {carouselData && carouselData.map((item, i) => {
                return (<CarouselItem key={i} value={item} />)
              })
              }
            </ReactOwlCarousel> */}
            <Carousel controls={false} activeIndex={index} onSelect={handleSelect} className="owl-theme owl_custom owl-loaded owl-drag result p-0" data-bs-ride="carousel">
              {carouselData &&
                carouselData.map((data, index) => {
                  return (
                    <Carousel.Item key={index}>
                        <CarouselItem key={index} value={data} />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  )
}

export default Carousel1


const data = [
    {
      name: 'ASHISH ARORA SIR',
      image: '/assets/images/AAhearder.jpg',
      text_1: '5 AIR-1 & 130+ Ranks in Top - 100 in JEE Adv, JEE Main & NEET',
      text_2: '10,000+ IITians & 15,000+ Medicos',
      text_3: `21 International Olympiad Medalists of Physics, Astronomy & Jr.Science`,
      text_4: `AIR-1 of JEE Advanced with Historically highest score: Mridul Agarwal(348 / 360 in 2021)`,
      text_5: `The only dropper who secured AIR-1 in IIT-JEE ever: Dungara Ram Choudhary(2002)`,
      text_6: `First Ever International Gold Medal for India in IPhO at UK & also secured AIR-4 in IIT-JEE: Navneet Loiwal(2000)`,
      text_7: `4 times International Medalist in Physics & Astronomy Olympiads (2012, 2013, 2014, 2015):Sheshansh Agarwal`,
      message: 'My goal is to put Physics on the top of student’s list of favourites and remove any fear if they have about it as this subject contains secrets of happenings across the universe. Physics Galaxy is a small tribute to the world of science.',
      channel_name: 'PHYSICS GALAXY',
      channel_url: 'https://www.youtube.com/@physicsgalaxyworld',
    }
    // ,
    // {
    //   name: 'AMAN MALIK SIR',
    //   image: amansir,
    //   text_1: 'Teaching for JEE Mains, JEE Advanced, Maths Olympiads from 12+ years',
    //   text_2: 'Questions Specialist',
    //   text_3: 'Known for short and innovative methods to solve Maths Problems',
    //   text_4: 'Started Maths journey with VK Bansal Sir in KOTA',
    //   message: 'Mathematics is one of the most interesting subject. We can develop Maths skills by solving different problems. My goal is to make Maths simple and students favourite subject',
    //   channel_name: 'BHANNAT MATHS',
    //   channel_url: 'https://www.youtube.com/@BHANNATMATHS'
  
    // }
  ]
  