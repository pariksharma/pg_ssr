import React, { useState } from "react";
import "./banner.css";
import Carousel from "react-bootstrap/Carousel";

export default function Banner(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  

  return (
    <>
      <section className="banner-images">
        <div className="container-fluid">
          <div className="row rowContainer">
            <Carousel controls={false} activeIndex={index} onSelect={handleSelect} className="owl-theme owl_custom owl-loaded owl-drag result p-0" data-bs-touch="false">
              {props.images &&
                props.images.map((data, index) => {
                  return (
                    <Carousel.Item key={index}>
                        <img src={data.banner_url} className={`img-fluid ${data.length > 0 ? 'cursor' : ''}`}  />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
