import React, { useEffect, useState } from "react";
import Tab from "./tab";
import { useNavigate, useParams } from "react-router-dom";
import { getMasterDataService } from "../../services";
import { isLogin, resHandler } from "../../utils/helper";
import Modal from "../../components/modal/modal";
import BuyCourseModal from "../../components/buyCourseModal/index";
import { useSearchParams } from "react-router-dom/dist";
import LoginPageModal from "../login/loginPageModal";

const Image_icon = '/assets/images/icons/Image.png'
const subject_icon = '/assets/images/icons/subject_icon.png'
const topic_icon = '/assets/images/icons/topic_icon.png';
const lock_icon = "/assets/images/icons/lock_icon.svg"

export default function ImageTab({ value, tabName, is_purchased, mrp, resetRef }) {
  const [layer1Data, setLayer1Data] = useState();
  const [showLayer, setShowLayer] = useState("layer1");
  const [layer2List, setLayer2List] = useState();
  const [layer1Index, setLayer1Index] = useState();
  const [layer2Index, setLayer2Index] = useState();
  const [layer3Data, setLayer3Data] = useState();
  const [pageNum, setPageNum] = useState(0);
  const [isOpenBuyCourseModal, setIsOpenBuyCourseModal] = useState(false);
  const [imageUrl, setImageUrl] = useState()
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()

  const [searchParam, setSearchParam] = useSearchParams();
  const [id, setId] = useState()
  useEffect(() => {
    if (typeof searchParam !== "undefined") {
      setId(searchParam.get('course_id'))
    }
  }, [searchParam]);

  useEffect(() => {
    if (value) {
      setLayer1Data(value);
      // setShowLayer()
    }
    {
      console.log(value, "value");
    }
  }, [value]);

  const getLayer2Data = (index) => {
    setLayer1Index(index);
    setShowLayer("layer2");
    setLayer2List(layer1Data.meta?.list[index]);
  };

  const getLayer3Data = async (index) => {
    setShowLayer("layer3");
    setLayer2Index(index);
    // console.log(layer1Data, "layer1Data");
    // console.log(layer2List, "layer 2 Data");
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

  const handleOpenPDF = async (item) => {
    if (isLogin) {
      if (item.is_locked == "0" || is_purchased == "1") {
        setImageUrl(item.file_url);
        setIsModalOpen(true);
      } else {
        setIsOpenBuyCourseModal(true);
      }
    } else {
      // const fullUrl = window.location.href;
      //     localStorage.setItem('redirect' , fullUrl);
      //     navigate('/login')
      setOpenLoginModal(true)
    }

  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    // setNumPages(numPages);
  };

  return (
    <>
      <LoginPageModal ModalOpen={openLoginModal} OpenModal={() => setOpenLoginModal(true)} CloseModal={() => setOpenLoginModal(false)} />
      <BuyCourseModal ModalOpen={isOpenBuyCourseModal} mrp={mrp} CloseModal={() => setIsOpenBuyCourseModal(false)} />

      <div className="custom-breadcrumb">
        <span
          ref={resetRef}
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

      {/* <Modal.Header closeButton></Modal.Header> */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setImageUrl(); }}>
        {imageUrl ? <img className="image_modal" src={imageUrl} /> : 'NO Image'}


      </Modal>
      <>{showLayer == "layer3"
        ? layer3Data &&
        layer3Data.list.map((item, i) => {
          return (
            <div className=" pg-tabs-description" key={i} onClick={() => handleOpenPDF(item)}>
              <div className="tabs-deschovr d-flex align-items-center justify-content-between rounded shadow">
                <div className="pg-sb-topic d-flex align-items-center justify-content-center ">
                  <span className="videoimage">

                    <img src={item.image ? item.image : Image_icon} height={"50px"} />

                    {/* <i className="fa fa-file-text" aria-hidden="true"></i> */}
                  </span>
                  <h3>{item.title}</h3>
                </div>
                <div className="pg-sb-topic pe-4">
                  <span className="videoimage text-center"> {item.is_locked == "0" || is_purchased == '1' ? (

                    <p style={{ marginTop: '19px' }}><span style={{ padding: '10px' }} className="badge btn btn-dark">View</span></p>

                  ) : (
                    <img src={lock_icon} />
                  )} </span>
                </div>
              </div>
            </div>
          );
        })
        : showLayer == "layer2"
          ? layer2List &&
          layer2List.list.map((item, i) => {
            return (
              <Tab item={item} key={i} Index={i} nextIndex={getLayer3Data} image={topic_icon} />
            );
          })
          : showLayer == "layer1" &&
          layer1Data &&
          layer1Data?.meta?.list?.map((item, i) => {
            return (
              <Tab item={item} key={i} Index={i} nextIndex={getLayer2Data} image={subject_icon} />
            );
          })}
      </>
    </>
  );
}
