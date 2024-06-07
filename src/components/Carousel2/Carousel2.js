import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import Card2 from "../card2/card2";
const image1 = "/assets/images/cg-1.png";
export default function Carousel2({ bestSellingData }) {
  // const [carouselData, setCarouselData] = useState(data)
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel controls={false} activeIndex={index} onSelect={handleSelect} className="owl-theme owl_custom owl-loaded owl-drag result p-0" data-bs-touch="false">
        {bestSellingData && bestSellingData.map((item, i) => {

          return (
            <Carousel.Item key={index}>
                <Card2
                name={item.title}
                imageUrl={item.cover_image}
                mrp={item.mrp}
                validity={item.validity}
                avg_rating={String(item.avg_rating)}
                key={i}
                id={item.id}
                is_purchased={Number(item.is_purchased)}
                course_sp={item.course_sp}
                user_rated={item.user_rated}
                />
            </Carousel.Item>
          )
        })}
        {/* <Card2
          name={item.title}
          imageUrl={item.cover_image}
          mrp={item.mrp}
          validity={item.validity}
          avg_rating={String(item.avg_rating)}
          key={i}
          id={item.id}
          is_purchased={Number(item.is_purchased)}
          course_sp={item.course_sp}
          user_rated={item.user_rated}
        /> */}
        {/* <Card2 imageUrl={image1} />
        <Card2 imageUrl={image1} />
        <Card2 imageUrl={image1} /> */}
        {/* <Card />
        <Card /> */}
      </Carousel>
    </>
  );
}
