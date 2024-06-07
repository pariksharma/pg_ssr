import React, { useState } from "react";

export default function Carousel3Item({ value }) {
  const [fullLength, setFullLenth] = useState(true);
  function truncateTitle(value, maxLength = 200) {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.slice(0, maxLength) + "...";
    }
  }

  // return value.map((value, index) => {
    // {console.log("val", value)}
    return (
      <div className="d-flex">
        <div className="item ">
          <div className="p-3 card-section">
            <div className="card-testi">
              <div className="px-4 card-testi-p pb-3">
                <p className="font-weight-light my-3 text-dark ">
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                  {fullLength ? (
                    <>
                      {truncateTitle(value[0].message)}
                      <span
                        className="readmordiv cursor"
                        onClick={() => setFullLenth(false)}
                      >
                        Read more
                      </span>
                    </>
                  ) : (
                    `${value[0].message}`
                  )}
                </p>
              </div>
            </div>
            <div className="row d-flex ">
              <div className="col-lg-4 col-md-5 col-5">
                <div className=" circle text-white rounded-circle  position-relative">
                  <img
                    className="rounded-circle shadow "
                    src={value[0].image}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-7 col-7">
                <div className="m-1">
                  <h5 className=" mb-0">{value[0].name}</h5>
                  <small className="font-weight-bold">
                    {value[0].position}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {value[1] ? (
          <div className="item ">
            <div className="p-3 card-section">
              <div className="card-testi">
                <div className="px-4 card-testi-p pb-3">
                  <p className="font-weight-light my-3 text-dark ">
                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                    {fullLength ? (
                      <>
                        {truncateTitle(value[1].message)}
                        <span
                          className="readmordiv cursor"
                          onClick={() => setFullLenth(false)}
                        >
                          Read more
                        </span>
                      </>
                    ) : (
                      `${value[1].message}`
                    )}
                  </p>
                </div>
              </div>
              <div className="row d-flex ">
                <div className="col-lg-4 col-md-5 col-5">
                  <div className=" circle text-white rounded-circle  position-relative">
                    <img
                      className="rounded-circle shadow "
                      src={value[1].image}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-8 col-md-7 col-7">
                  <div className="m-1">
                    <h5 className=" mb-0">{value[1].name}</h5>
                    <small className="font-weight-bold">
                      {value[1].position}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  // });
}
