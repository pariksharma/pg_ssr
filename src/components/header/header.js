import React, { useEffect, useMemo, useState, cache, useRef } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import LoginButton from "../Buttons/loginButton/loginButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cartCountService,
  getCourse_Catergory_Service,
  getMyProfileService,
  getUserAddressService,
  showCartService,
  userLoginService,
  userLogoutService,
  getCourses_Service

} from "../../services";
import { image_check, isLogin, resHandler } from "../../utils/helper";
import {
  address_Action,
  all_categoryAction,
  cart_Count_Action,
  cart_Action
} from "../../containers/home/masterContentSlice";
import Button4 from "../Buttons/button4/button4.js";
import SideModal from "../sideModal/sideModal";
import CartModal from "../sideModal/cartModal";
import toast from "react-hot-toast";
import { logoutAction } from "../userDetails/logoutSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { profileAction } from "../../containers/profile/profileSlice";
import { Nav, NavDropdown } from "react-bootstrap";
import LogoutPopup from "../userDetails/logoutPopup.js";
import LoginPageModal from "../../containers/login/loginPageModal.js";
import DeleteAccount from "../userDetails/deleteAccount.js";
import NoDataFound from "../../containers/noDataFound/noDataFound.js";
import CryptoJS from "crypto-js";
import { useQuery } from "react-query";
import $ from 'jquery';

const secret_Key = "%!F*&^$)_*%3f&B+";

const galaxy_logo = "/assets/images/galaxy-logo.png";
const UserProfileImage = "/assets/images/user (4).png";


export default function Header(props) {

  const getLocalStorageItem = (key) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  };
  let isLoggedIn = getLocalStorageItem('jwt')
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [allCourseList, setAllCourseList] = useState();
  const [courseParantList, setCourseParantList] = useState();
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openSearchList, setOpenSearchList] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const cart_count = useSelector((state) => state.allCategory.cart_count);

  const [cartCount, setCartCount] = useState(cart_count ? cart_count : 0);

  const allCategory = useSelector((state) => state.allCategory.allCategory);
  const Cart_Data = useSelector((state) => state.allCategory.cart);
  const dispatch = useDispatch();
  const [settingsData, setSettingsData] = useState();
  const [showCartItem, setShowCartItem] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  const [profilePicture, setProfilePicture] = useState();
  const [searchCourseList, setSearchCourseList] = useState();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const profileData = useSelector((state) => state.profileDetail.profile);
  const settingDetails = useSelector(
    (state) => state.allCategory.allCategory.settings
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("")
  const [isactive, setisactive] = useState(false)

  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
          setisactive(false)
        }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current?.contains(event.target)) {
          setToggleMenu(false)
        }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);

  useEffect(() => {
    if (typeof settingDetails != "undefined") {
      setSettingsData(settingDetails);
    }
  }, [settingDetails]);

  const getCourseData = (value) => {
    // setCourseId(value);
    const formData = new FormData();
    formData.append("page", 1);
    formData.append("search", value);
    formData.append("main_cat", 0);
    formData.append("sub_cat", 1);
    formData.append("course_type", 0);

    if (value.length > 0) {
      setTimeout(async () => {
        await getCourses_Service(formData)
          .then((res) => {

            let { status, data, message } = resHandler(res);
            console.log('pskdkdkd', data)
            setSearchCourseList(data)

          })
          .catch((err) => {
            console.log(err);
          });
      }, 200);
    }

    // }
  };

  useEffect(() => {
    if (isLogin) {
      if (profileData.name) {
        if (profileData.profile_picture != "undefined") {
          setProfilePicture(profileData.profile_picture);
        }
      } else {
        getMyProfile();
      }
    }
  }, [profileData]);

  const getMyProfile = (async () => {
    await getMyProfileService()
      .then((res) => {
        let { status, data, message } = resHandler(res);
        console.log("success2", status, data);
        if (status && data.name) {
          dispatch(profileAction(data));
          //  setName(data.name);
          //  setEmail(data.email)
          //  setMobile(data.mobile);
          //  setAddress(data.address);
          //  setCity(data.city);
          //  setState(data.state);
          //  setPinCode(data.pin_code);
          //  setCountry(101);



          //  data.profile_picture != 'undefined' &&  setProfilePicture(data.profile_picture);
          // getCountryList();
          //  getStateList(data.country);
          //  getcity(data.state)

        }
        else {
          localStorage.clear();
          navigate(0)
        }

      }).catch(err => console.log(err))
  })


  const handleSearchList = () => {
    // console.log("first")
    setOpenSearchList(!openSearchList);
  };
  const handleShowCart = () => {
    setShowCartItem(!showCartItem);
  };

  const path = (value) => {
    const pathArray = value.split("/");

    // Remove the last ID by slicing the array
    pathArray.pop();

    // Reconstruct the new path
    return pathArray.join("/");
  };

  const findpath = useMemo(() => path(pathname), [pathname]);

  useEffect(() => {
    if (!allCategory) {
      // console.log("hellol")

      // getCourseCategory();
      // getDetail();
      // getSavedAddress();

      // const filteredData = dataArray.filter(item => item.parent_id === "0");
      // setParentData(filteredData);
    } else {
      // console.log("elsee");
      setAllCourseList(allCategory.all_cat);
    }
  }, []);
  useEffect(() => {
    // console.log("allcouse", allCourseList)
    if (allCourseList) {
      const filteredData = allCourseList.filter(
        (item) => item.parent_id === "0"
      );
      // console.log("filter", filteredData)
      setCourseParantList(filteredData);
    }
  }, [allCourseList]);

  useEffect(() => {

    if (typeof cart_count != "undefined") {
      setCartCount(cart_count);
    }

  }, [cart_count]);



  // useEffect(() => {
  //   if (typeof Cart_Data !== "undefined") {
  //     return () => { getCartCount(); }
  //   }
  // }, [Cart_Data]);

  // *********************************************************
  // useEffect(() => {
  //   if (Cart_Data !== undefined) {
  //     // console.log("jjjjjj", typeof Cart_Data)
  //     if (cart_count == '0')
  //       getCartCount();
  //   }
  // }, [Cart_Data !== undefined]);
  // **********************************************************

  useEffect(() => {
    // console.log("cartcount: ",typeof Cart_Data)
    // console.log("cartcount: ",Cart_Data)
    if (Cart_Data !== undefined) {
      // console.log("jjjjjj", typeof Cart_Data)
      getCartCount();
    }
  }, [Cart_Data]);





  const getSavedAddress = () => {
    if (isLogin) {
      getUserAddressService()
        .then((res) => {
          let { status, data, message } = resHandler(res);
          console.log("res_data1", res)
          console.log("res_data2", res.data)
          console.log("res_data3", data)
          status && dispatch(address_Action(data));
          // console.log("getuserAddress", data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const handleLoginClick = () => {
    const close = document.querySelector('[data-bs-dismiss="offcanvas"]')
    // const fullUrl = window.location.href;
    // localStorage.setItem('redirect' , fullUrl);
    // navigate('/login');
    setOpenLoginModal(true)
    close && close.click();
  }

  const handleSearchInput = () => {
    setOpenSearchInput(!openSearchInput);
  }
  const handleNotification = () => {
    setOpenNotification(!openNotification);
  }


  /*
  const getCourseCategory = async () => {
    // console.log(allCategory, "allCategory")
    const formData = new FormData();

    await getCourse_Catergory_Service(formData)
      .then((res) => {
        // if ((res.statusText = "OK")) {
        let { status, data, message } = resHandler(res);
        // console.log(status, data, message, "exam")
        console.log("data1 ", res.data);

        const response_data = res.data;

        /////////////////// API DEcryption ///////////////

        // var bytes  = CryptoJS.AES.decrypt(JSON.stringify({response_data}), secret_Key);
        // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        // const decData = CryptoJS.enc.Base64.parse(response_data).toString(CryptoJS.enc.Utf8)
        // const bytes = CryptoJS.AES.decrypt(decData, secret_Key).toString(CryptoJS.enc.Utf8);
        // const decrypted_data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        // let byt = CryptoJS.AES.decrypt(cryptoInfo.toString(), secret_Key).toString(CryptoJS.enc.Utf8);
        // let decData = CryptoJS.enc.Base64.parse(decData).toString(CryptoJS.enc.Utf8)
        // let bytes = CryptoJS.AES.decrypt(response_data, secret_Key);
        // let r_data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        // console.log("data1 ", decryptedData)


        if (status) {
          console.log("all_cat_data", data)
          dispatch(all_categoryAction(res.data.data));
          setAllCourseList(res.data.all_cat);
          // setBanner(data.banner_list_web[0].banner_url)
        }


        // }
      })
      .catch((err) => console.log(err));
  };

  */


  //////////////Caching / Local Storage on getCourse_Catergory_Service (Content)////////////////////////


  const fetchCourseCategory = async () => {
    const formData = new FormData();
    const response_category_Service = await getCourse_Catergory_Service(formData);
    // console.log("response!!!!!" , response_category_Service.data);
    return response_category_Service.data.data;
  }

  // const setDataLocalStorage = (key, data) => {
  //   localStorage.setItem(key, JSON.stringify(data));
  //   console.log("mmmmmmmmmmmm", data)
  // }

  // const getDataLocalStorage = (key) => {
  //   const data = localStorage.getItem(key);
  //   return data ? JSON.parse(data) : undefined;
  // }


  const { data: Detail_Data, isLoading, isError, isSuccess } = useQuery('detail_Service', fetchCourseCategory, {
    // initialData: getDataLocalStorage('cached_detail_Service'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isSuccess) {
      // setDataLocalStorage('cached_detail_Service', Detail_data);
      // console.log("after ", Detail_Data)
      dispatch(all_categoryAction(Detail_Data));
      setAllCourseList(Detail_Data.all_cat);
    }
  }, [Detail_Data])



  //////////////////////////////////////////////////////////////////////////


  //////////////Caching on UserAddressService (get_user_address)////////////////////////



  const fetchUserAddressService = async () => {
    const responseUserAddressService = await getUserAddressService()
    // console.log("responseUserAddress", responseUserAddressService.data.data)
    return responseUserAddressService.data
  }

  const { data: UserAddressdata, isFetched } = useQuery("address_Service", fetchUserAddressService, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (isFetched) {
      // console.log("userAddress", UserAddressdata)
      dispatch(address_Action(UserAddressdata));
    }
  }, [isFetched])



  //////////////////////////////////////////////////////////////////////



  const childData = (value) => {
    return allCourseList.filter((item) => item.parent_id === value);
  };

  const handleLogoutButtonClick = async (e) => {
    e.preventDefault();
    await userLogoutService()
      .then((res) => {
        const { data, status, message } = resHandler(res);
        status && localStorage.clear();

        status && navigate(0);
        // navigate('/')/
        // message && toast.success(message);
        status && dispatch(logoutAction());
        status &&
          setTimeout(() => {
            navigate(0);
            toast.success(message);
          }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCartCount = () => {
    if (isLogin) {
      cartCountService().then((res) => {
        let { status, data, message } = resHandler(res);
        status && dispatch(cart_Count_Action(data.total_count));
        // console.log(data, res, "cartCount");
      });
    }
  };

  const handleOpenVideo = async () => {
    setIsOpenModal(true);
  };
  const handleDeleteVideo = async () => {
    setIsDeleteModal(true);
  };

  // JavaScript to handle the custom data-bs-overflow attribute
  if (typeof document !== 'undefined') {
    $(document).ready(function () {
      $('[data-bs-toggle="offcanvas"]').on('click', function () {
        const target = $(this).data('bs-target'); // Get the target offcanvas menu ID
        const overflow = $(this).data('bs-overflow'); // Get the data-bs-overflow attribute

        // Check if the offcanvas menu is being opened or closed
        if ($(target).hasClass('show')) {
          // Offcanvas is being opened
          if (overflow === 'scroll') {
            // If data-bs-overflow is set to "scroll", allow scrolling
            $('body').css('overflow', 'auto');
          } else {
            // If data-bs-overflow is not set or set to other values, prevent scrolling
            $('body').css('overflow', 'hidden');
          }
        } else {
          // Offcanvas is being closed, restore original body overflow
          $('body').css('overflow', 'auto');
        }
      });
    });
  }

  // const debounce = (func, limit) => {
  //   let timer;
  //   return function(){
  //     let args = arguments,
  //       context = this;
  //       clearTimeout(timer);
  //       timer = setTimeout(() => { 
  //         func.apply(context, arguments);
  //       }, limit)
  //     }
  //   }

  useEffect(() => {
    let timer = setTimeout(() => {
      // console.log(searchInputValue);
      getCourseData(searchInputValue)
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInputValue]);

  /*
 let response_data2;
 const getDetail = async () => {
   const formData = new FormData();
   console.log("getDetaill")
   await getCourse_Catergory_Service(formData)
     .then((res) => {
       // if ((res.statusText = "OK")) {
       let { status, data, message } = resHandler(res);
       // console.log(status, data, message, "exam")
 
       response_data2 = res.data;
     })
     .catch((err) => console.log(err))
   return response_data2
 }
 
 const { data, status, isFetching, isLoading } = useQuery(
   {
     queryKey : "detail_service",
     queryFn:  getDetail, 
     refetchOnMount: false,
     refetchOnWindowFocus: false
   }
 );
 // console.log("dot: ", data, "status: ", isLoading);
 
 if (status === "success") {
   console.log("success: ", data.data.all_cat)
   
   if (data.status) {
     console.log("success2", data.status)
     // if(data.data.all_cat.length)
     dispatch(all_categoryAction(data.data));
     // setAllCourseList(data.data.all_cat);
   }
   // setAllCourseList(data.data.all_cat);
   // setBanner(data.banner_list_web[0].banner_url)
 }
 */

  const showCartData = async () => {
    if (isLogin) {
      showCartService()
        .then((res) => {
          let { status, data, message } = resHandler(res);
          console.log("llllllllllll", status, "gfjhghj", data)
          status && dispatch(cart_Action(data));

          !status && dispatch(cart_Action(data))
        })
        .catch((err) => console.log(err));
      cartCountService().then((res) => {
        let { status, data, message } = resHandler(res);
        status && dispatch(cart_Count_Action(data.total_count));
        console.log(data, res, "cartCount");
      });
    }
  };



  return (
    <>
      <LoginPageModal ModalOpen={openLoginModal} OpenModal={() => setOpenLoginModal(true)} CloseModal={() => setOpenLoginModal(false)} />
      <LogoutPopup
        ModalOpen={isOpenModal}
        CloseModal={() => {
          setIsOpenModal(false);
        }}
      />
      <DeleteAccount ModalOpen={isDeleteModal}
        CloseModal={() => {
          setIsDeleteModal(false);
        }} />
      <header className="pg-top-header">
        <div className="container">
          <div className="row" ref={sidebarRef}>
            <nav className="navbar backgroung-gif bg-body-tertiary navbar-expand-lg">
              <div className="h-logo p-1">
                <Link className="navbar-brand logo " to="/">
                  <img src={galaxy_logo} alt="Physics Galaxy" />
                </Link>
              </div>

              {/* <div className='header-navtabs'>         */}
              {screenWidth < 991 && (
                <button
                  className="navbar-toggler me-2"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  data-bs-overflow="scroll"
                  aria-controls="offcanvasNavbar"
                  aria-label="Toggle navigation"
                  aria-expanded="true"
                  onClick={() => setToggleMenu(true)}
                >
                  <span className="navbar-toggler-icon">
                    {/* <i className="fa fa-bars" aria-hidden="true"></i> */}
                  </span>
                </button>
              )}
              {/* <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header bg-grey">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  <div className="h-logo p-1">
                <Link className="navbar-brand logo" to="/">
                  <img src={galaxy_logo} alt="Physics Galaxy" />
                </Link>
              </div>
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Link
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Dropdown
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                 
                </div>
              </div> */}

              {/* <div className=''> */}
              <div
                className={`offcanvas offcanvas-end ${toggleMenu ? "show" : ""}`}
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                // ref={sidebarRef}
              >
                <div className="offcanvas-header bg-grey">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    <div className="h-logo p-1">
                      <Link className="navbar-brand logo" to="/">
                        <img src={galaxy_logo} alt="Physics Galaxy" />
                      </Link>
                    </div>
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => setToggleMenu(false)}
                  ></button>
                </div>

                {/* <div className={`${toggleMenu ? "activemenu" : "inactivemenu"} select-course mx-3`}> */}
                  <div className="select-course mx-3">
                  {/* {findpath !== '//allcourses' && } */}
                  <div className="dropdown" onClick={()=>setisactive(!isactive)} ref={dropdownRef}>
                    <Link
                      className={`pg-allcourse dropdown-toggle ${isactive ? "show" : "" } `}
                      id="dLabel"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      All Courses
                      <span className="caret"></span>
                    </Link>
                    <ul
                      className={`dropdown-menu course-dropdown multi-level ${isactive ? "show" : ""} `}
                      aria-labelledby="dLabel"
                    >
                      {/* {console.log("parent", courseParantList)} */}
                      {courseParantList &&
                        courseParantList.map((item, i) => {
                          return (
                            <li className="dropdown-submenu pg-submenu" key={i}>
                              <Link className="d-flex justify-content-between">
                                <span>{item.name}</span>
                                <span>
                                  <i
                                    className="fa fa-angle-right fw-bold"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </Link>
                              {childData(item.id).length !== 0 && (
                                <ul className="dropdown-menu course-dropmenu shadow  ">
                                  {childData(item.id) &&
                                    childData(item.id).map((value, i) => {
                                      // {console.log('childData', value)}
                                      return (
                                        <li
                                          key={i}
                                          onClick={() =>
                                            navigate(
                                              `/allcourses?courses_id=${value.id}`
                                            )
                                          }
                                        >
                                          <Link>{value.name}</Link>
                                        </li>
                                      );
                                    })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <ul className="navbar-nav mt-1 mx-3 pg-navigation">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link " to="/about-us">
                      About Us
                    </Link>
                  </li>
                  {/* <li className="nav-item">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li> */}
                  {settingsData && settingsData?.left_menu.Event == "1" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/events">
                        Events
                      </Link>
                    </li>
                  )}
                  {/* <li className="nav-item">
              <Link className="nav-link" to="/physicsgalaxy/testimonials">
                Testimonials
              </Link>
            </li> */}
                  {/* <li className="nav-item">
              <Link className="nav-link" to="/physicsgalaxy/contact">
                Contact Us
              </Link>
            </li> */}
                </ul>
                <div className="header-asdz">
                  {!isLoggedIn ? (
                    <LoginButton LoginClick={handleLoginClick} />
                    // <LoginPageModal ModalOpen={isOpenModal}
                    // CloseModal={() => {
                    //   setIsOpenModal(false);

                    // }} />
                  ) : (
                    // <Button4 name={'Profile'} onButtonClick={() => navigate('//user-profile')}/>}

                    <div className="pg-user-login-section">
                      <div className="d-flex align-items-center mx-2 log2 hidesn">
                        {/* <div className='pg-notification'>
                    <div className="dropdown">
                            <button id="notification" className="btn shadow-none show border-0" data-bs-toggle="dropdown" aria-expanded="true" onClick={handleNotification}>
                              <span className="font-heading "><i className="fa fa-bell-o me-2 text-white"></i></span> 
                            </button>
                          {openNotification &&  <ul className="dropdown-menu notification-drop-menu p-0 show" aria-labelledby="notification" data-bs-popper="none">
                              <li><Link>
                                <div className='d-flex align-items-center  m-2 border-bottom'>
                                  <div className='pg-notification-img'>
                                    <img src={UserProfileImage}/>
                                  </div>
                                  <div className='noti-details ms-2'>
                                  <h6 className='mb-0'>Report Create Successfully</h6>
                                   <p className='mb-0'>Notification</p>
                                  <p className='mb-0 text-end'>7 Aug 2023 - 13:39 PM</p>
                               </div>
                                </div>
                                </Link>
                              </li>                              
                              <li><Link>
                                <div className='d-flex align-items-center  m-2 border-bottom'>
                                  <div className='pg-notification-img'>
                                    <img src={UserProfileImage}/>
                                  </div>
                                  <div className='noti-details ms-2'>
                                  <h6 className='mb-0'>Report Create Successfully</h6>
                                   <p className='mb-0'>Notification</p>
                                  <p className='mb-0 text-end'>7 Aug 2023 - 13:39 PM</p>
                               </div>
                                </div>
                                </Link>
                              </li>
                              <li><Link>
                                <div className='d-flex align-items-center  m-2 border-bottom'>
                                  <div className='pg-notification-img'>
                                    <img src={UserProfileImage}/>
                                  </div>
                                  <div className='noti-details ms-2'>
                                  <h6 className='mb-0'>Report Create Successfully</h6>
                                   <p className='mb-0'>Notification</p>
                                  <p className='mb-0 text-end'>7 Aug 2023 - 13:39 PM</p>
                               </div>
                                </div>
                                </Link>
                              </li>
                              
                              <li><Link>
                              
                                   <div className='text-center mb-2 allnotification'>
                                      <h6 className='mb-0'>See all notification<i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i></h6>
                                   </div>
                               
                                </Link>
                              </li>
                            </ul>}
                          </div>
                    </div> */}

                        <Nav className="dropdown profile-navdropdown">
                          <NavDropdown
                            title={
                              <img
                                src={
                                  profilePicture
                                    ? profilePicture
                                    : UserProfileImage
                                }
                                alt="userprofile"
                                className="shadow "
                              />
                            }
                          >
                            <NavDropdown.Item
                              onClick={() => navigate("/user-profile")}
                              className="dropdown-item drop-item"
                            >
                              <i
                                className="fa fa-user me-2"
                                aria-hidden="true"
                              ></i>
                              My Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              onClick={() => navigate("/library")}
                              className="dropdown-item drop-item"
                            >
                              <i
                                className="fa fa-book me-2"
                                aria-hidden="true"
                              ></i>
                              My Library
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              onClick={() => navigate("/purchasehistory")}
                              className="dropdown-item drop-item"
                            >
                              <i
                                className="fa fa-shopping-cart me-2"
                                aria-hidden="true"
                              ></i>
                              Purchase History
                            </NavDropdown.Item>
                            <hr className="dropdown-divider" />
                            <NavDropdown.Item
                              onClick={handleOpenVideo}
                              className="dropdown-item drop-item"
                            >
                              <i
                                className="fa fa-sign-out me-2"
                                aria-hidden="true"
                              ></i>
                              Logout
                            </NavDropdown.Item>
                            {settingDetails?.left_menu.delete_account === '1' && <NavDropdown.Item
                              onClick={handleDeleteVideo}
                              className="dropdown-item drop-item"
                            >
                              <i
                                className="fa fa-trash me-2"
                                aria-hidden="true"
                              ></i>
                              Delete Account
                            </NavDropdown.Item>
                            }
                            {/* onClick={() => setProfileDropdown(!profileDropdown)} */}
                            {/* <img src={profilePicture ? profilePicture : UserProfileImage} alt="userprofile" className='shadow' />
                        <span className="caret"></span> */}
                          </NavDropdown>
                          {/* {profileDropdown && 
                      <ul className="pg-profile-dropdown dropdown-menu" aria-labelledby="userprofile"> */}
                          {/* <li>
                          <h6>Name</h6>
                          <p>Developer</p>
                         </li> */}
                          {/* <li><hr className="dropdown-divider"/></li> */}
                          {/* <li> <div className='text-center'> */}
                          {/* <h5 className='mb-0 fw-bold'>Sahil</h5> */}

                          {/* </div>   </li> */}
                          {/* <li><hr className="dropdown-divider"/></li> */}
                          {/* <li><Link className="dropdown-item " to={'/user-profile'}><i className="fa fa-user me-2" aria-hidden="true"></i>My Profile</Link></li>
                         <li><Link className="dropdown-item" to={'/library'}><i className="fa fa-book me-2" aria-hidden="true"></i>My Library</Link></li>
                         <li><Link className="dropdown-item" to={'/purchasehistory'}><i className="fa fa-shopping-cart me-2" aria-hidden="true"></i>Purchase History</Link></li> */}
                          {/* <li><Link className="dropdown-item" to={'/purchased-events'}><i className="fa fa-calendar me-2" aria-hidden="true"></i>Event</Link></li> */}
                          {/* <li><Link className="dropdown-item"><i className="fa fa-television me-2" aria-hidden="true"></i>Live Class</Link></li>
                         <li><Link className="dropdown-item"><i className="fa fa-file-text me-2" aria-hidden="true"></i>Live Test</Link></li> */}
                          {/* <hr className="dropdown-divider"/>
                         <li onClick={handleLogoutButtonClick}><Link className="dropdown-item"><i className="fa fa-sign-out me-2" aria-hidden="true"></i>Logout</Link></li>

                       </ul>
                       } */}
                        </Nav>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* <form role="search" method="get" className="search-form" action=""> */}

              {/* <div className="search-group pg-s-g shadow my-1">
                <div className="search-box">
                  <input className="search-text position-relative" type="text" onChange={(e) => { setSearchInputValue(e.target.value) }} onInput={() => setShowCart(true)} onBlur={(e) => { e.target.value('') }} placeholder="Search" />
                  {showCart && <div className={searchInputValue !== "" ? "search-result" : "search-result2"}>
                    {searchCourseList ?
                      searchCourseList.map((item, i) => {
                        return (
                          <div className="d-flex align-items-center py-2 search-border" key={i} onClick={() => navigate(`/view_details?course_id=${item.combo_course_ids.length ? item.id : item.id}`)}>
                            <div className="w-40">
                              <div className="search_img"><img src={image_check(item?.cover_image)} /></div>
                            </div>
                            <div className="search_content_dt ms-2 w-60">
                              <h6>{item?.title}</h6>
                              <p>By Physics Galaxy</p>
                              <p>Validity: {item?.validity}</p>
                            </div>

                          </div>
                        )
                      }) :
                      <div className='text-center'>
                        <div className='pg-no-data-found'>
                          <NoDataFound height={'50vh'} />
                        </div>
                      </div>
                    }
                  </div>}
                  <div className="search-btn">

                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                </div>
              </div> */}

              {/* </form> */}

              {/* <div className='pg-purchase-card' onClick={handleShowCart}>
                <CartModal CartCount={cartCount} cartUpdate={showCartData} />
              </div> */}
              {/* </div> */}

              {/* </div> */}
            </nav>
          </div>
        </div>
        {/* {profileDropdown && 
      <div onClick={() => setProfileDropdown(false)} className='background-div'>

      </div>} */}
      </header>
    </>
  );
}
