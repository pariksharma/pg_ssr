import React, { useEffect, useState } from "react";
import Tab from "./tab";
import { useNavigate, useParams } from "react-router-dom";
import { getMasterDataService } from "../../services";
import { isLogin, resHandler } from "../../utils/helper";
import BuyCourseModal from "../../components/buyCourseModal/index";
import { useSearchParams } from "react-router-dom";
import NoDataFound from "../noDataFound/noDataFound";
import LoginPageModal from "../login/loginPageModal";
import { Document, Page, pdfjs } from "react-pdf";

const pdf_icon = "/assets/images/icons/pdf.png";
const subject_icon = "/assets/images/icons/subject_icon.png";
const topic_icon = "/assets/images/icons/topic_icon.png";
const lock_icon = "/assets/images/icons/lock_icon.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.js`;

export default function PDF({ value, tabName, is_purchased, mrp, resetRef }) {
  const [layer1Data, setLayer1Data] = useState();
  const [showLayer, setShowLayer] = useState("layer1");
  const [layer2List, setLayer2List] = useState();
  const [layer1Index, setLayer1Index] = useState();
  const [layer2Index, setLayer2Index] = useState();
  const [layer3Data, setLayer3Data] = useState();
  const [pageNum, setPageNum] = useState(0);
  const [isOpenBuyCourseModal, setIsOpenBuyCourseModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState();

  const [openFile, setOpenFile] = useState(false);

  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();
  const [id, setId] = useState();
  const [numPages, setNumPages] = useState(null);
  const [openLoginModal, setOpenLoginModal] = useState(false)
  useEffect(() => {
    if (typeof searchParam !== "undefined") {
      setId(searchParam.get("course_id"));
    }
  }, [searchParam]);

  useEffect(() => {
    if (value) {
      console.log(value, "pdf")
      setLayer1Data(value);
    }
  }, [value]);
  // const ResetLayer= () =>{
  //   setShowLayer('layer1');
  // }
  function onDocumentLoadSuccess({ numPages }) {
    // console.log(numPages, "numPage")
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

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
    console.log('getLayer3', result);
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
        setPdfUrl(item.file_url);
        setOpenFile(true);

        //  await fetch('https://presales-mob-dev.s3.amazonaws.com/doc_file_1684134713226_20230125T062214846Z0.16747805304609442.pdf')
        // .then((res) => {
        //   return res.blob();
        // })
        // .then(async (blob) => {
        //   const URL = await blobToURL(blob);
        //   setPdfUrl(URL);
        //   setIsModalOpen(true);

        // }).catch((err) => {
        //   console.log(err);
        // });
      } else {
        setIsOpenBuyCourseModal(true);
      }
    } else {
      setOpenLoginModal(true);
      // const fullUrl = window.location.href;
      //     localStorage.setItem('redirect' , fullUrl);
      // navigate('/login')
    }
  };

  return (
    <>
      <BuyCourseModal
        ModalOpen={isOpenBuyCourseModal}
        CloseModal={() => setIsOpenBuyCourseModal(false)}
        mrp={mrp}
      />
      {/* const [openLoginModal, setOpenLoginModal] = useState(false) */}
      <LoginPageModal ModalOpen={openLoginModal} OpenModal={() => setOpenLoginModal(true)} CloseModal={() => setOpenLoginModal(false)} />

      <div className="custom-breadcrumb">
        <span ref={resetRef}
          className={showLayer == "layer1" ? 'active-breadcrumb' : ''}
          onClick={() => {
            setShowLayer("layer1");
            setOpenFile(false);
          }}
        >
          {tabName}
        </span>
        <span
          className={showLayer == "layer2" ? 'active-breadcrumb' : ''}
          onClick={() => {
            setShowLayer("layer2");
            setOpenFile(false);
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
            setOpenFile(false);
          }}
        >
          {showLayer == "layer3"
            ? ` > ${layer2List.list[layer2Index].title}`
            : ""}
        </span>
      </div>
      {openFile ? (
        <div >
          <Document
            file='https://d2qxo9rqhf0w5j.cloudfront.net/427admin_v1/file_manager/pdf/518364248795792000.pdf'
            onLoadError={console.error}
            onLoadSuccess={onDocumentLoadSuccess}
          // pageNumber={1}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div></div>

          <div className="flex text-center"> <p>
            Page {pageNumber} of {numPages}
          </p>
            <div className="tabs-button">
              <button
                className="tabsprevious"
                onClick={previousPage}
                disabled={pageNumber == 1}
              >
                <i className="fa fa-angle-left chaptr-btn" aria-hidden="true"></i>
              </button>
              <button
                className="tabsnext"
                onClick={nextPage}
                disabled={
                  numPages == pageNumber
                }
              >
                <i className="fa fa-angle-right chaptr-btn" aria-hidden="true"></i>
              </button>
            </div>
            {/* <button onClick={previousPage}>&lt;</button>
        <button onClick={nextPage}>&gt;</button> */}
          </div>
        </div>
      ) : (
        <>
          {showLayer == "layer3" ? (
            layer3Data ? (
              layer3Data.list.map((item, i) => {
                return (
                  <div
                    className="pg-tabs-description"
                    key={i}
                    onClick={() => handleOpenPDF(item)}
                  >
                    <div className="tabs-deschovr d-flex align-items-center rounded shadow">
                      <div
                        className="pg-sb-topic d-flex align-items-center "
                        style={{ width: "97%" }}
                      >
                        <span className="videoimage">
                          <img
                            src={item.image ? item.image : pdf_icon}
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
                            <button className="btn"><i className="fa fa-book-reader read-icon" aria-hidden="true"></i>Read</button>
                          ) : (
                            // <i className="fa fa-angle-right" aria-hidden="true"></i>

                            <img src={lock_icon} style={{width: '30px'}} />
                          )}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                {" "}
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
                <>
                  <Tab
                    item={item}
                    key={i}
                    Index={i}
                    nextIndex={getLayer2Data}
                    image={subject_icon}
                  />
                </>
              );
            })
          )}
        </>
      )}
    </>
  );
}
