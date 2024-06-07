import React, { useEffect, useState } from "react";
import Tab from "./tab";
import { useNavigate, useParams } from "react-router-dom";
import { getMasterDataService } from "../../services";
import { isLogin, resHandler } from "../../utils/helper";
import BuyCourseModal from "../../components/buyCourseModal/index";
import VideoPopup from "./videoPopup";
import { useSearchParams } from "react-router-dom/dist";
import NoDataFound from "../noDataFound/noDataFound";
import LoginPageModal from "../login/loginPageModal";

const video_icon = "/assets/images/icons/Video.png";
const subject_icon = "/assets/images/icons/subject_icon.png";
const topic_icon = "/assets/images/icons/topic_icon.png";
const lock_icon = "/assets/images/icons/lock_icon.svg";

export default function Video({ value, tabName, is_purchased, mrp, resetRef }) {
  const [layer1Data, setLayer1Data] = useState();
  const [showLayer, setShowLayer] = useState("layer1");
  const [layer2List, setLayer2List] = useState();
  const [layer1Index, setLayer1Index] = useState();
  const [layer2Index, setLayer2Index] = useState();
  const [layer3Data, setLayer3Data] = useState();
  const [isOpenBuyCourseModal, setIsOpenBuyCourseModal] = useState(false);
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const [id, setId] = useState();
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (value) {
      setLayer1Data(value);
      // setShowLayer()
    }

  }, [value]);
  useEffect(() => {
    setShowLayer("layer1");
    return (() => setShowLayer('layer1'))
  }, [])
  useEffect(() => {
    if (typeof searchParam !== "undefined") {
      setId(searchParam.get("course_id"));
    }
  }, [searchParam]);

  const getLayer2Data = (index) => {
    setLayer1Index(index);
    setShowLayer("layer2");
    setLayer2List(layer1Data.meta?.list[index]);
    console.log(layer1Data.meta?.list[index]);

    // if(index){
    //   console.log(index)
    // }
  };

  const getLayer3Data = async (index) => {
    setShowLayer("layer3");
    setLayer2Index(index);
    console.log(layer1Data, "layer1Data");
    console.log(layer2List, "layer 2 Data");
    const data = {
      tile_id: layer1Data.id,
      type: layer1Data.type,
      revert_api: layer1Data.revert_api,
      topic_id: layer2List.list[index].id,
      subject_id: layer2List.id,
      layer: 3,
      page: 1,
    };
    const result = await getDetail(data);
    console.log(result);
    setLayer3Data(result);
  };

  const getDetail = async (data) => {
    const formData = new FormData();
    formData.append("course_id", id);
    formData.append("tile_id", data.tile_id);
    formData.append("type", data.type);
    formData.append("revert_api", data.revert_api);
    formData.append("topic_id", data.topic_id);
    formData.append("subject_id", data.subject_id);
    formData.append("layer", data.layer);
    formData.append("page", data.page);
    return await getMasterDataService(formData)
      .then((res) => {
        let { data, status, message } = resHandler(res);
        if (status) {
          // console.log(data, "data");
          return data;
          // setAboutData(data);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleOpenVideo = async (item) => {
    if (isLogin) {
      if (item.is_locked == "0" || is_purchased == "1") {
        // console.log(item.file_url);
        setIsOpenVideoModal(true);
        // setPdfUrl(item.file_url);
        // setIsModalOpen(true);
      } else {
        setIsOpenBuyCourseModal(true);
      }
    } else {
      // const fullUrl = window.location.href;
      //     localStorage.setItem('redirect' , fullUrl);
      //     navigate('/login')
      setOpenLoginModal(true)
    }
  };

  return (
    <>
      {/* const [openLoginModal, setOpenLoginModal] = useState(false) */}
      <LoginPageModal ModalOpen={openLoginModal} OpenModal={() => setOpenLoginModal(true)} CloseModal={() => setOpenLoginModal(false)} />
      <VideoPopup
        ModalOpen={isOpenVideoModal}
        CloseModal={() => setIsOpenVideoModal(false)}
        is_purchased={is_purchased}
      />
      <BuyCourseModal
        ModalOpen={isOpenBuyCourseModal}
        CloseModal={() => setIsOpenBuyCourseModal(false)}
        mrp={mrp}
      />
      <div className="custom-breadcrumb">
        <span ref={resetRef}
          className={showLayer == "layer1" ? 'active-breadcrumb' : ''}
          onClick={() => {
            setShowLayer("layer1");
          }}
        >
          {tabName}
        </span>
        <span
          className={showLayer == "layer2" ? 'active-breadcrumb' : ''}
          onClick={() => {
            setShowLayer("layer2");
          }}
        >
          {(layer2List != undefined && showLayer == "layer2") ||
            showLayer == "layer3"
            ? ` > ${layer2List.title}`
            : ""}
        </span>
        <span
          className={showLayer == "layer3" ? 'active-breadcrumb' : ''}
          onClick={() => {
            setShowLayer("layer3");

          }}
        >
          {showLayer == "layer3"
            ? ` > ${layer2List.list[layer2Index].title}`
            : ""}
        </span>
      </div>
      {showLayer == "layer3" ? (
        layer3Data ? (
          layer3Data.list.map((item, i) => {
            return (
              <div
                className=" pg-tabs-description"
                key={i}
                onClick={() => handleOpenVideo(item)}
              >
                <div className="tabs-deschovr d-flex align-items-center rounded shadow">
                  <div
                    className="pg-sb-topic d-flex align-items-center"
                    style={{ width: "97%" }}
                  >
                    <span className="videoimage">
                      <img
                        src={item.image ? item.image : video_icon}
                        height={"50px"}
                      />
                      {/* <i className="fa fa-file-text" aria-hidden="true"></i> */}
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="pg-sb-topic pe-2">
                    <div className="btnsalltbba text-center">
                      {" "}
                      {isLogin && item.is_locked == "0" || is_purchased == "1" ? (
                        <>

                          < button
                            className="btn"
                          >
                            <i className="fa fa-play" aria-hidden="true"></i>
                            Watch
                          </button>
                        </>
                      ) : (
                        // <i className="fa fa-angle-right" aria-hidden="true"></i>
                        <img src={lock_icon} />
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <NoDataFound />
          </div>
        )
      ) : showLayer == "layer2" ? (
        layer2List &&
        layer2List.list.map((item, i) => {
          return (
            <Tab
              item={item}
              key={i}
              Index={i}
              nextIndex={getLayer3Data}
              image={topic_icon}
            />
          );
        })
      ) : (
        showLayer == "layer1" &&
        layer1Data &&
        layer1Data?.meta?.list?.map((item, i) => {
          return (
            <Tab
              item={item}
              key={i}
              Index={i}
              nextIndex={getLayer2Data}
              image={subject_icon}
            />
          );
        })
      )}
    </>
  );
}
