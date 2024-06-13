import React, { useState, useEffect } from "react";
import "./library.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import LinkSend from "../../components/linkSend/linkSend";
import Tab from "react-bootstrap/Tab";
import toast from "react-hot-toast";
import Tabs from "react-bootstrap/Tabs";
import UserDetails from "../../components/userDetails/userDetails";
import Button5 from "../../../src/components/Buttons/button5/button5";
import { getMyCourseService, deleteCourseService } from "../../services";
import { formatTimestamponly, image_check, resHandler } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { libraryAction } from "./librarySlice";
import NoDataFound from "../noDataFound/noDataFound";
import NoDataFoundNew from "../noDataFoundNew/noDataFoundNew";

const libraryimage = "/assets/images/content-img.png";
const notcoursefound = "/assets/images/not-c-f.png";

export default function Library() {
  const [key, setKey] = useState("paidcourse");
  const [paidCourseList, setPaidCourseList] = useState();
  const [freeCourseList, setFreeCourseList] = useState();
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.libraryDetail.library);
  const navigate = useNavigate();

  function truncateTitle(value, maxLength = 27) {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.slice(0, maxLength) + "...";
    }
  }
  useEffect(() => {
    if (courseData) {
      setPaidCourseList(courseData.paid_course);
      setFreeCourseList(courseData.free_course);
      console.log('freeCourseList', courseData.free_course);
    } else {
      getMyCourses();
    }
    // console.log("first")
  }, [courseData]);
  const handleViewDetailsClick = (id) => {
    // console.log(id)
    // e.preventDefault();
    // navigate(`/view_details?course_id=${id}`);
  };

  const handleDeleteCourse = async (id, txn_id) => {
    const res = window.confirm('Are you sure to delete this course?');
    const formData = new FormData();
    formData.append("course_id", id);
    formData.append("txn_id", txn_id);
    console.log("/////");
    if (res === true) {
      // e.preventDefault();
      await deleteCourseService(formData).then(res => {
        const { data, status, message } = resHandler(res);
        // console.log("DData", data);
        // console.log("status", status);
        toast.success(message);
        getMyCourses();
        navigate('/library');

        // location.reload()

      }).catch(err => {
        console.log(err)
      })
    }
    else {
      // console.log("......", res)
      // navigate('/library')
      // location.reload()

      // navigate('/library')
      return false;
    }

  }

  const getMyCourses = async () => {
    await getMyCourseService()
      .then((res) => {
        const { data, status, message } = resHandler(res);
        if (status) {
          const filteredcourseData = data.filter(
            (item) => item.cat_type == "0"
          );
          const filterPaidCourse = data.filter((item) => item.mrp > 0);
          const filterFreeCourses = data.filter((item) => item.mrp == 0);
          console.log(data, "data");
          dispatch(
            libraryAction({
              paid_course: filterPaidCourse,
              free_course: filterFreeCourses,
            })
          );
          setFreeCourseList(filterFreeCourses);
          setPaidCourseList(filterPaidCourse);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />

      <section className="py-4 pg-userprofile-section">
        <div className="container">
          <div className="section-user-profile">
            <div className="row ">
              <div className="col-lg-3 col-md-4">
                <UserDetails />
              </div>

              <div className="col-lg-9 col-md-8">
                <div className="profile-title">
                  <h4 className="fw-bold">My Library</h4>
                  {/* <span><i className="fa fa-pencil-square-o ms-2" aria-hidden="true"></i> Edit</span> */}
                </div>
                <hr />
                <div className="rounded-3">
                  <div className="p-2 rounded-3 bg-white shadow">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="mb-1 mt-1 justify-content-start tabs-onoff"
                    >
                      <Tab
                        eventKey="paidcourse"
                        title="Paid Course"
                        className="paidcrse"
                      >
                        <div className="my-1 p-1">
                          <div className="row d-flex align-items-center">
                            {paidCourseList && paidCourseList.length ? (
                              paidCourseList.map((item, i) => {
                                return (
                                  <div
                                    className="col-lg-4 col-md-6 col-12"
                                    key={i}
                                  >
                                    <div className="text-center  vjed_sub_all py-1">
                                      <Link
                                        to={`/view_details?course_id=${item.combo_course_ids.length
                                          ? item.id + "_"
                                          : item.id
                                          }`}
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="E Learning"
                                      >
                                        <div className="card vjed-card library-card radious_all">
                                          <div className="pg-library-image">
                                            <img
                                              src={image_check(item.desc_header_image)}
                                              className="card-img-top radious_all"
                                              alt="header_image"
                                            />

                                          </div>
                                          <div className="card-body vjed-card-body">
                                            <h5 className="card-title vjed-card-title">
                                              {truncateTitle(item.title)}
                                              {/* {item.title} */}
                                            </h5>
                                            <p className="bygalxy">
                                              By Physics Galaxy
                                            </p>
                                            <div className="pg-validity mb-2">
                                              <i
                                                className="fa fa-calendar"
                                                aria-hidden="true"
                                              ></i>
                                              &nbsp;<strong>Validity:</strong>
                                              {formatTimestamponly(
                                                item.purchase_date
                                              )}
                                              To{" "}
                                              {formatTimestamponly(
                                                item.expiry_date
                                              )}
                                            </div>
                                            <hr className="mt-0 mb-2"></hr>
                                            <div>
                                              <Button5
                                                type="button"
                                                name={"Let's Study "}
                                                onButtonClick={() => {
                                                  item.combo_course_ids
                                                    .length == 0
                                                    ? handleViewDetailsClick(
                                                      item.id
                                                    )
                                                    : handleViewDetailsClick(
                                                      item.id + "_"
                                                    );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                {" "}
                                <div className="text-center vjed-library-h my-3">
                                  <NoDataFoundNew height={'43vh'} />
                                </div>
                                {/* <div className="text-center">
                <img src={notcoursefound} className="w-50"/>
              </div> */}
                              </>
                            )}
                            {/* <div className="col-lg-3 col-md-6 col-12">
                        <div className="text-center  vjed_sub_all py-1">
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="E Learning">
  <div className="card vjed-card radious_all">
  <img src={libraryimage} className="card-img-top radious_all p-1" alt="..."/>
      <div className="card-body vjed-card-body">
          <h5 className="card-title vjed-card-title"> Rank Booster Series | La.. 
          </h5>
          <p className="card-text vjed-text">Rank Booster Series | Laws of Motion & Friction | JEE Main 2022</p>
      </div>
  </div>
                            </a>
                        </div>
                    </div> */}
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="freecourse" title="Free Course">
                        <div className="my-1 p-1">
                          <div className="row d-flex align-items-center">
                            {freeCourseList && freeCourseList.length ? (
                              freeCourseList.map((item, i) => {
                                return (
                                  <div
                                    className="col-lg-4 col-md-6 col-12"
                                    key={i}
                                  >
                                    <div className="text-center  vjed_sub_all py-1">
                                      <div className="card vjed-card library-card radious_all">
                                        <div className="deleteIcon" style={{ position: 'absolute' }}>
                                          <i className="fa fa-trash" aria-hidden="true" title="Delete Course" onClick={() => handleDeleteCourse(item?.id, item?.txn_id)}></i>
                                        </div>
                                        <Link
                                          to={`/view_details?course_id=${item.id}`}
                                          data-toggle="tooltip"
                                          data-placement="bottom"
                                          title="E Learning"
                                        >
                                          <div className="pg-library-image position-relative">

                                            <img
                                              src={image_check(item.desc_header_image)}
                                              // src= {'data:image/jpeg;base64,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'}
                                              className="card-img-top radious_all p-1"
                                              alt="header_image"
                                            />

                                          </div>
                                          <div className="card-body vjed-card-body">
                                            <h5 className="card-title vjed-card-title">
                                              {truncateTitle(item.title)}
                                            </h5>
                                            <p className="bygalxy">
                                              By Physics Galaxy
                                            </p>
                                            <div className="pg-validity mb-2">
                                              <i
                                                className="fa fa-calendar"
                                                aria-hidden="true"
                                              ></i>
                                              &nbsp;<strong>Validity:</strong>
                                              {formatTimestamponly(
                                                item.purchase_date
                                              )}
                                              To{" "}
                                              {formatTimestamponly(
                                                item.expiry_date
                                              )}
                                            </div>
                                            <hr className="mt-0 mb-2"></hr>
                                            <div>
                                              <Button5
                                                name={"Let's Study"}
                                                onButtonClick={() => {
                                                  item.combo_course_ids
                                                    .length == 0
                                                    ? handleViewDetailsClick(
                                                      item.id
                                                    )
                                                    : handleViewDetailsClick(
                                                      item.id + "_"
                                                    );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </Link>
                                      </div>

                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                {" "}
                                <div className="text-center vjed-library-h my-3">
                                  <NoDataFoundNew height={'43vh'} />
                                  {/* <h6>No Course Found</h6> */}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LinkSend />
      <Footer />
    </>
  );
}
