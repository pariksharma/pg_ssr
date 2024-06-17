import React, { useState, useEffect, useRef } from 'react'
import "./landingPage2.css";

import useRazorpay from "react-razorpay";
import {
    emailRegex,
    jwt_decode,
    resHandler,
    stringToFloat,
    throttle,
} from "../../utils/helper";
import {
    cityListService,
    couponVerifyService,
    getCouponService,
    getCourse_Detail_Service,
    getFPaymentService,
    sendVerificationOtpService,
    stateListService,
} from "../../services";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";
import PaymentGatewayModal from "../../components/paymentGatewayModal/paymentGatewayModal";
import SweetAlert2 from "react-sweetalert2";
import TestLoading from "../testLoading/testLoading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ThankyouModal from "./thankyouModal";
import { razorpayGateway } from "../../services/paymentGateways";
import Carousel3 from "../../components/Carousel3/carousel3";
import { useQuery } from "react-query";
import $ from 'jquery'

const galaxylogo = "assets/landingPage_images/galaxy-logo.png";
const pglogo = "assets/landingPage_images/pg-logo.png";
const offerImg = "assets/landingPage_images/offer-img.webp";
const ashishsir = "assets/landingPage_images/ashish-sir.png";
const ashishImg = "assets/landingPage_images/ashish.png";
// const thankyou = "assets/landingPage_images/thankyou-gif.gif";

const vedio_app = "/assets/images/videocourse.jpg";
const AAheader = '/assets/images/AAhearder.jpg';
const ios_image = "/assets/images/ios.png";

export default function LandingPage2() {
    const [Razorpay] = useRazorpay();
    const selectStateRef = useRef(null);
    const selectCityRef = useRef(null);
    const phoneRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParam, setSearchParam] = useSearchParams();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [courseDetail, setCourseDetail] = useState();
    const [swalProps, setSwalProps] = useState({});
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [seconds, setSeconds] = useState(60); // Initial timer value in seconds
    const [timerActive, setTimerActive] = useState(false);
    const [coupanCode, setCoupanCode] = useState("");
    const [preAppliedCoupon, setPreAppliedCoupon] = useState(false);
    const [couponApplied, setCoupanApplied] = useState(false);
    const [couponFetched, setCouponFetched] = useState(false);
    const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState();
    const [stateList, setStateList] = useState();
    const [cityList, setCityList] = useState();
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [couponError, setCouponError] = useState(false);
    const navigate = useNavigate();
    const [faqToggle, setFAQToggle] = useState({status: true, value: 0})
    const [activeState, setActiveState] = useState(false)



    const value = {
        name: 'ASHISH ARORA SIR',
        image: AAheader,
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


    useEffect(() => {
        getCourseDetails(process.env.REACT_APP_COURSEID2);
        // getCoupons(process.env.REACT_APP_COURSEID2);
        // getStateList(101);
    }, []);

    // const GoogleTagManager = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=G-MJXVRNVM1V`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-MJXVRNVM1V');

        return () => {
            // Clean up function if necessary
        };
    }, []);

    //   return null; // This component doesn't render anything to the DOM
    // };

    // useEffect(() =>{
    //   if(coupanCode && coupanCode.length >= 8){
    //     const data = {
    //       coupon : coupanCode,
    //       course_id : process.env.REACT_APP_COURSEID2
    //     }
    //     applyCoupan(data)
    //   }
    // },[coupanCode])
    const startTimer = () => {
        setTimerActive(true);
        setSeconds(60); // Reset the timer to the initial value
    };

    useEffect(() => {
        if (searchParam.get("utm_content") && typeof searchParam !== "undefined") {
            setCoupanCode(searchParam.get("utm_content"));
            const data = {
                coupon: searchParam.get("utm_content"),
                course_id: process.env.REACT_APP_COURSEID2,
            };
            setPreAppliedCoupon(false);
            const value = applyCoupan(data);
            setCouponFetched(value);
        } else {
            setCoupanCode(null);
        }
    }, [searchParam]);

    useEffect(() => {
        let intervalId;
        if (timerActive) {
            intervalId = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else {
                    setTimerActive(false);
                    clearInterval(intervalId);
                }
            }, 1000);
        }

        // Clean up the timer when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [seconds, timerActive]);

    const handleName = (e) => {
        setNameError(false);
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^A-Za-z\s'-.]/g, "");
        setName(sanitizedValue);
    };
    useEffect(() => {
        if (typeof document !== 'undefined') {
            $(document).ready(function () {
                $('#play-video').on('click', function (ev) {

                    $("#video")[0].src += "&autoplay=1";
                    ev.preventDefault();

                });
            }); 
        }
    })
    const handlePhoneChange = (e) => {
        setPhoneError(false);
        const value = e.target.value;
        // const numericValue = inputValue.replace(/\D/g, '');
        const sanitizedValue = value.replace(/\D/g, "");

        // const phoneNumberWithoutCountry = value.replace(`${country.dialCode}`, '');
        setPhoneNumber(sanitizedValue);
        // setCountryCode(country.dialCode)
        if (sanitizedValue.length == 10) {
            if (sanitizedValue != "0000000000") {
                sendOtp(sanitizedValue);
            } else {
                setPhoneError(true);
            }
        }
    };

    const sendOtp = async (value) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mobile", value);
        formData.append("resend", 0);
        formData.append("is_promotional", 1);
        formData.append("is_registration", 1);
        formData.append("device_id", "WEB");
        formData.append("device_token", "WEB");
        formData.append("email", email);
        formData.append("course_id", process.env.REACT_APP_COURSEID2);
        formData.append("coupon_code", coupanCode ? coupanCode : "");
        formData.append("app_id", process.env.REACT_APP_APP_ID);

        // setState("");
        // setCity("");
        // formData.append('c_code', countryCode)
        // formData.append('otp',otp);
        await sendVerificationOtpService(formData).then((res) => {
            const { status, data, message } = resHandler(res);

            // console.log(res, "data");
            if (status) {

                if (data) {
                    // setName(data.name)
                    if (data.state && data.state.length) {
                        const stateId = stateList.find((item) => item.name == data.state);
                        setTimeout(() => {
                            if (stateId) {
                                setState(stateId.id);
                                setCity(data.city);
                                getcity(stateId.id, data.city);
                            }
                        }, 1000);
                    }
                }
                message && toast.success(message);
                setOtpSent(true);
                startTimer();
            }
        });
    };

    const getStateList = async (params) => {
        const formData = new FormData();
        formData.append("country_id", params);
        await stateListService(formData)
            .then((res) => {
                let { data, status, message } = resHandler(res);
                console.log("data", data)
                status && setStateList(data);
            })
            .catch((err) => console.log(err));
    };
    const getcity = async (params, city) => {
        const formData = new FormData();
        formData.append("state_id", params);
        await cityListService(formData)
            .then((res) => {
                let { data, status, message } = resHandler(res);
                status && setCityList(data);
                if (city) {
                    const cityId = data.find(
                        (item) => item.name == city
                    );
                    console.log(cityId, "city")

                    setCity(cityId.id);
                }
            })
            .catch((err) => console.log(err));
    };

    //////////////Caching on aboutUsService (about)////////////////////////

    const fetchStateListService = async () => {
        const params = 101;
        const formData = new FormData();
        formData.append("country_id", params);
        const response_state_List = await stateListService(formData);
        // console.log("response_state", response_state_List.data.data);
        return response_state_List.data.data
    }

    const { data: state_data, isFetched } = useQuery("state_List_Service", fetchStateListService, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (isFetched) {
            // console.log("state_data", state_data)
            setStateList(state_data)
        }
    }, [isFetched])


    ///////////////////////////////////////////////////////////////////////

    const findStateName = (id) => {
        return stateList.find((item) => item.id == id);
    };
    const findCityName = (id) => {
        return cityList.find((item) => item.id == id);
    };

    const handleState = (e) => {
        setState(e.target.value);
        getcity(e.target.value);
        setStateError(false);
    };

    const handleCity = (e) => {
        const value = JSON.parse(e.target.value);
        setCity(e.target.value);
        setCityError(false);
    };

    const handleResendOtp = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mobile", phoneNumber);
        formData.append("resend", 1);
        formData.append("is_registration", 1);
        formData.append("is_promotional", 1);
        formData.append("course_id", process.env.REACT_APP_COURSEID2);
        formData.append("coupon_code", coupanCode ? coupanCode : "");
        formData.append("app_id", process.env.REACT_APP_APP_ID);

        // formData.append('otp',otp);
        await sendVerificationOtpService(formData)
            .then((res) => {
                const { status, data, message } = resHandler(res);

                if (status) {
                    toast.success(message);
                    startTimer();
                }
            })
            .catch((err) => console.log(err));
    };

    const getCourseDetails = async (value) => {
        const formData = new FormData();
        formData.append("course_id", value);
        formData.append("parent_id", value);
        await getCourse_Detail_Service(formData)
            .then((res) => {
                let { status, data, message } = resHandler(res);
                // console.log(data.course_detail, "courseD");
                status && setCourseDetail(data.course_detail);
                // status && setTimeout(() =>{
                //   setOpenModal(true)
                // }, 1000);
                !status && setPaymentLoading(false);
                !status && message && toast.error(message);
            })
            .catch((err) => console.log(err));
    };

    const getCoupons = async (value) => {
        const formData = new FormData();
        formData.append("course_id", value);
        formData.append("parent_id", "");
        await getCouponService(formData)
            .then((res) => {
                let { status, data, message } = resHandler(res);
                //  const coupon = data.find(coupon => coupon.coupon.target_type === "2");
                //  const coupon_detail = {
                //   coupon : coupon.coupon.coupon_tilte,
                //   course_id : coupon.id
                //  }
                //  if(status && coupon){
                //   applyCoupan(coupon_detail);
                //   setPreAppliedCoupon(true);
                //  }
            })
            .catch((err) => console.log(err));
    };

    const applyCoupan = async (value) => {
        const formData = new FormData();
        setCouponError(false);
        if (value.coupon.length) {
            formData.append("coupon_code", value.coupon);
            formData.append("course_id", value.course_id);
            await couponVerifyService(formData)
                .then((res) => {
                    const { status, data, message } = resHandler(res);
                    if (status) {
                        setCoupanApplied(true);

                        setCouponDiscount(data[0]);
                        return true;
                    } else {
                        // 'The coupon code field is required.'
                        message && toast.error(message);
                        setCoupanApplied(false);
                        setCoupanCode("");
                        setCouponFetched(false);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setCouponError(true);
        }
    };

    const handleSubmit = async () => {
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');

        setNameError(false);
        setPhoneError(false);
        setEmailError(false);
        setOtpError(false);
        if (
            phoneNumber.length >= 10 &&
            emailRegex.test(email) &&
            otp.length >= 6 &&
            name.trim().length >= 3 &&
            city.length &&
            state.length
        ) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("mobile", phoneNumber);
            formData.append("resend", 0);
            formData.append("is_promotional", 1);
            formData.append("is_registration", 1);
            formData.append("device_id", "WEB");
            city && formData.append("city", findCityName(city)?.name);
            state && formData.append("state", findStateName(state)?.name);
            formData.append("device_token", "WEB");
            formData.append("email", email);
            formData.append("course_id", process.env.REACT_APP_COURSEID2);
            formData.append("coupon_code", coupanCode ? coupanCode : "");
            formData.append("app_id", process.env.REACT_APP_APP_ID);

            // formData.append('c_code', countryCode)
            formData.append("otp", otp);
            await sendVerificationOtpService(formData)
                .then((res) => {
                    const { status, data, message } = resHandler(res);
                    !status && message && toast.error(message);
                    status && localStorage.setItem("jwt", data.jwt);
                    !status && message && setOtp("");
                    // status && message && setOtpSent(false);
                    status && jwt_decode(data.jwt);

                    status &&
                        setTimeout(() => {
                            setPaymentLoading(true);
                            // setTimeout(() =>{
                            setOpenModal(true);
                            // }, 1000);
                            // getCourseDetails(process.env.REACT_APP_COURSEID2);
                            closeButton && closeButton.click();
                        }, 500);

                    //   status && toast.success(message);
                    //   status && setOtpVerfied(true);;
                    //   !status && message &&( message == 'OTP expired') && location.reload();
                })
                .catch((err) => console.log(err));
        } else {
            if (phoneNumber.length < 10) {
                setPhoneError(true);
            }
            if (!email.length || !emailRegex.test(email)) {
                setEmailError(true);
            }
            if (otp.length < 6) {
                otpSent && setOtpError(true);
            }
            if (name.trim().length < 3) {
                setNameError(true);
            }
            if (!city.length) {
                setCityError(true);
            }
            if (!state.length) {
                setStateError(true);
            }
        }
    };

    useEffect(() => {
        const script = document.createElement("script");

        script.src =
            "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js";
        script.async = true;
        // script.src =
        //   "https://checkout.razorpay.com/v1/checkout.js";
        // script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSelectedPaymentGateway = (value) => {
        // console.log(value, "selectedPayemtn");
        // console.log(value, "value");
        handlePayment(value);
        // console.log(e.target.value)
        // setSelectedPaymentGateway(e.target.value)
    };
    const handleOTP = (e) => {
        setOtpError(false);
        const numericValue = e.target.value.replace(/\D/g, "");
        setOtp(numericValue);
    };
    const handlePayment = async (value) => {

        setPaymentLoading(true);
        const formData = new FormData();
        formData.append("type", 1);
        formData.append("course_id", process.env.REACT_APP_COURSEID2);
        formData.append("is_promotional", 1);
        {
            couponApplied
                ? formData.append("course_price", stringToFloat(couponDiscount.mrp))
                : formData.append("course_price", stringToFloat(courseDetail.mrp));
        }
        {
            couponApplied
                ? formData.append("tax", stringToFloat(couponDiscount.tax))
                : formData.append("tax", stringToFloat(courseDetail.tax));
        }
        {
            value.meta_name == "RZP_DETAIL" && formData.append("pay_via", 3);
        }
        {
            value.meta_name == "EASEBUZZ_DETAIL" && formData.append("pay_via", 9);
        }
        formData.append(
            "coupon_applied",
            couponApplied ? couponDiscount.coupon.id : 0
        );

        await getFPaymentService(formData)
            .then((res) => {
                let { data, status, message } = resHandler(res);
                // console.log(data)
                let key = value.mid;
                if (status) {
                    // alert('Open Pop Up ON')

                    if (value.meta_name == "RZP_DETAIL") {
                        // console.log(data, value, key, "key")
                        setPaymentLoading(false);
                        // razorpayGateway(data.txnToken, key)
                        const options = {
                            key: value.key,
                            // amount: `${courseDetail}`,
                            // currency: "INR",
                            // name: "PHYSICS GALAXY",
                            // description: "Test Transaction",
                            // image: pglogo,
                            order_id: data.pre_transaction_id,
                            handler: (res) => {
                                console.log(res, "res");
                                const order_details = {
                                    txnid: res.razorpay_order_id,
                                    payid: res.razorpay_payment_id,
                                    pay_via: 3,
                                };
                                let status = 1;
                                payemntConfirmation(status, order_details);
                            },
                            theme: {
                                color: "#3399cy",
                            },
                        };

                        const rzp1 = new Razorpay(options);

                        rzp1.on("payment.failed", function (response) {
                            toast.error("Payment failed!");
                            //  localStorage.clear()
                            // alert(response.error.code);
                            // alert(response.error.description);
                            // alert(response.error.source);
                            // alert(response.error.step);
                            // alert(response.error.reason);
                            // alert(response.error.metadata.order_id);
                            // alert(response.error.metadata.payment_id);
                            //               razorpay_order_id
                            // :
                            // "order_MulbYNln4GNoPh"
                            // razorpay_payment_id
                            // :
                            // "pay_MulcQNOe63Z34A"
                            // razorpay_signature
                            // :
                            // alert('run')

                        });
                        rzp1.open();
                    }
                    if (value.meta_name == "EASEBUZZ_DETAIL") {
                        paymentGateWay(data.txnToken, key);
                        // alert('try')

                    }
                }
                // status &&
                !status && localStorage.clear();
                !status && message && toast.error(message);
                !status && setPaymentLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const paymentGateWay = async (acc_key, key) => {
        setPaymentLoading(false);
        var easebuzzCheckout = new window.EasebuzzCheckout(
            key,
            process.env.REACT_APP_TYPE
        );
        var options = {
            access_key: acc_key, // access key received via Initiate Payment
            onResponse: (response) => {
                // post_transaction_id
                const order_details = {
                    txnid: response.txnid,
                    easepayid: response.easepayid,
                    pay_via: 9,
                };
                let status = response.status == "success" ? 1 : 0;
                payemntConfirmation(status, order_details);
            },
            theme: "#123456", // color hex
        };

        await easebuzzCheckout.initiatePayment(options);
        // console.log(JSON.stringify(selectedPaymentGateway))
    };

    const payemntConfirmation = (status, data) => {
        // let status = response.status == "success" ? 1 : 0;
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        closeButton && closeButton.click();
        const modalTrigger = document.querySelector('[data-bs-target="#buynow"]');
        setPaymentLoading(true);
        const formData = new FormData();
        formData.append("type", 2);
        formData.append("course_id", process.env.REACT_APP_COURSEID2);

        {
            couponApplied
                ? formData.append("course_price", stringToFloat(couponDiscount.mrp))
                : formData.append("course_price", stringToFloat(courseDetail.mrp));
        }
        {
            couponApplied
                ? formData.append("tax", stringToFloat(couponDiscount.tax))
                : formData.append("tax", stringToFloat(courseDetail.tax));
        }
        formData.append("pay_via", data.pay_via);
        formData.append(
            "coupon_applied",
            couponApplied ? couponDiscount.coupon.id : 0
        );
        formData.append("pre_transaction_id", data.txnid);
        formData.append("transaction_status", status);
        formData.append("post_transaction_id", data.payid);
        formData.append("is_promotional", 1);
        getFPaymentService(formData)
            .then((res) => {
                let { data, status, message } = resHandler(res);
                console.log(res.data, "payment confirm");
                setPaymentLoading(false);
                if (status) {

                    setName("");
                    setPhoneNumber("");
                    setEmail("");
                    setState("");
                    setCity("");
                    setOtp("");

                    // openButton && openButton.click()
                    setOtpSent(false);
                    // setIsOpenVideoModal(true);
                    toast.success("Course Purchase Successfully");
                    navigate('/thank-you')

                } else {
                    modalTrigger && modalTrigger.click();

                    //         const modal = new bootstrap.Modal(openButton);
                    // modal.show();
                }
                localStorage.clear();
                !status && message && toast.error("Payment Failed!, Please try again!");

                // status &&
                //   setSwalProps({
                //     show: true,
                //     title:
                //       "Your course details will be sent directly to your email id. Don't forget to check your spam folder as well.",
                //     icon: "success",
                //   });
                //  status && sendDataToParent(order_details)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        // Simulate an async operation, e.g., fetching data
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    const handleOpenVideo = () => {
        setIsOpenVideoModal(true);
    };

    const handleStateFocus = () => {
        // console.log("first", selectStateRef);
        // document.getElementById('state').click();
        selectStateRef.current.click();
    };
    return (
        <>
            <>
                {typeof window !== 'undefined' && (
                    <SweetAlert2
                        {...swalProps}
                        onConfirm={(result) => {
                            navigate(0)
                            localStorage.clear();
                        }}
                    />
                )}
                {paymentLoading && <TestLoading />}
                {openModal && (
                    <PaymentGatewayModal
                        isOpen={openModal}
                        isClose={() => {
                            setOpenModal(false);
                            setPaymentLoading(false);
                            var enrollButton = document.getElementById('enrollnow');
                            if (enrollButton) {
                                enrollButton.click();
                            }
                        }}
                        selectedGateway={handleSelectedPaymentGateway}
                    />
                )}
                <div></div>
                <ThankyouModal
                    ModalOpen={isOpenVideoModal}
                    CloseModal={() => {
                        setIsOpenVideoModal(false);
                        navigate("/mentorship-for-pyq-talks-2025");
                    }}
                />
            </>

            <section className="page-section-1 pb-4">
                <div className="page-header shadow bg-black">
                    <div className="container">
                        <div className="header-title p-1 ">
                            <img src={galaxylogo} alt="Physics Galaxy" />
                        </div>
                    </div>
                </div>

                <div className="mt-5 page-section-1-logo-effect">
                    <div className="container">
                        <div className="p-sec-1-clr">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="leftside-col6 ">
                                        <div className="page-logo  pg-background">
                                            <img src={pglogo} alt="Physics Galaxy Logo" />
                                        </div>
                                        <div className="leftside-heading pb-2">
                                            <h2 className="mb-0">PYQ TALKS <span>For</span> </h2>
                                        </div>
                                        <div className="leftside-heading">

                                            <p>JEE ADVANCED REVISION SERIES</p>

                                        </div>

                                        <div className="leftside-btn">
                                            <a type="button" 
                                            // href="#" 
                                            className="btn btn-lg btn-enroll " 
                                            data-bs-toggle="modal"
                                            data-bs-target="#buynow"
                                            onClick={() => setActiveState(true)}>ENROLL NOW</a>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className=" rightside-img mt-4">

                                        <iframe className="videopopup"
                                            src="https://www.youtube.com/embed/zjbNNaTfXSA?si=f2663TpNNXCCyeoN"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {activeState ? <div className="model-opecity"></div> : null}

                <div
                    className={`modal fade show ${activeState ? 'modal_show' : ''}`}
                    id="buynow"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content popupform-content">
                            <div className="d-flex justify-content-between popupform-btn-close">
                                <div className="headingfrm">
                                    <h5>PHYSICS GALAXY - Mentorship Course</h5>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setActiveState(false)}
                                    ></button>
                                </div>
                            </div>
                            <div className="modal-body popupform-body">
                                <form>
                                    <div className="row mb-1">
                                        <label htmlFor="name" className=" col-form-label">
                                            Name<span className="text-danger">*</span>
                                        </label>
                                        <div className="">
                                            <input
                                                type="text"
                                                pattern="^[A-Za-z\s]+$"
                                                value={name}
                                                onChange={handleName}
                                                maxLength={30}
                                                className="form-control shadow-none"
                                                id="name"
                                                placeholder="Enter Your Name"
                                            />
                                            {nameError && (
                                                <p className="landingperror">
                                                    {" "}
                                                    Please enter valid name
                                                    {/* Name field must contain 3 to 30 characters. */}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="email" className=" col-form-label">
                                            Email ID<span className="text-danger">*</span>
                                        </label>
                                        <div className="">
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmailError(false);
                                                    setEmail(e.target.value);
                                                }}
                                                className="form-control shadow-none"
                                                id="email"
                                                placeholder="Enter Your Email ID"
                                            />
                                            {emailError && (
                                                <p className="landingperror">
                                                    {" "}
                                                    Please enter valid email id
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row mb-1">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="phone" className="col-form-label">
                                                Mobile No.<span className="text-danger">*</span>
                                            </label>
                                            {otpSent && (
                                                <div className="row">
                                                    <div className="d-flex justify-content-end align-items-center">
                                                        <button
                                                            className="forgetpassword"
                                                            type="button"
                                                            onClick={() => {
                                                                setOtpSent(false);
                                                                setOtp("");
                                                                setCity('');
                                                                setState('')
                                                                phoneRef.current && phoneRef.current.focus();
                                                            }}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="">
                                            <input
                                                type="text"
                                                ref={phoneRef}
                                                className="form-control shadow-none"
                                                id="phone"
                                                maxLength={10}
                                                value={phoneNumber}
                                                onChange={handlePhoneChange}
                                                disabled={otpSent}
                                                placeholder="Mobile No."
                                            />
                                            {phoneError && (
                                                <p className="landingperror">
                                                    {" "}
                                                    Please enter valid mobile number
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {otpSent && (
                                        <div className="row">
                                            <div className="">
                                                <label htmlFor="otp-verify" className="col-form-label">
                                                    OTP<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control shadow-none"
                                                    id="otp-verify"
                                                    maxLength={6}
                                                    placeholder="Enter OTP"
                                                    value={otp}
                                                    onChange={(e) => handleOTP(e)}
                                                />
                                                {otpError && (
                                                    <p className="landingperror">
                                                        {" "}
                                                        Please enter valid OTP
                                                    </p>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-end align-items-center mt-2">
                                                {timerActive ? (
                                                    <p>Resend OTP in : {seconds} secs</p>
                                                ) : (
                                                    <button
                                                        className="forgetpassword"
                                                        type="button"
                                                        onClick={throttle(handleResendOtp, 2000)}
                                                    >
                                                        Resend OTP
                                                    </button>
                                                )}
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-lg-6 slctstate">
                                                    <div className="row mb-1">
                                                        <label htmlFor="state" className="col-form-label">
                                                            State<span className="text-danger">*</span>
                                                        </label>
                                                        <div className="">
                                                            <select
                                                                id="state"
                                                                name="state"
                                                                className="form-control shadow-none"
                                                                value={state}
                                                                onFocus={handleStateFocus}
                                                                ref={selectStateRef}
                                                                onChange={handleState}
                                                            >
                                                                <option value="">Select State</option>
                                                                {stateList &&
                                                                    stateList.map((item, i) => {
                                                                        return (
                                                                            <option value={item.id} key={i}>
                                                                                {item.name}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                            {stateError && (
                                                                <p className="landingperror">
                                                                    Please select state
                                                                </p>
                                                            )}{" "}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="row mb-1">
                                                        <label htmlFor="email" className=" col-form-label">
                                                            City<span className="text-danger">*</span>
                                                        </label>
                                                        <div className="">
                                                            <select
                                                                id="city"
                                                                name="city"
                                                                className="form-control shadow-none"
                                                                value={city}
                                                                onChange={handleCity}
                                                            >
                                                                <option value="" disabled>
                                                                    Select City
                                                                </option>
                                                                {cityList &&
                                                                    cityList.map((item, i) => {
                                                                        return (
                                                                            <option value={item.id} key={i}>
                                                                                {item.name}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                            {cityError && (
                                                                <p className="landingperror">
                                                                    Please select city
                                                                </p>
                                                            )}{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {coupanCode != null && (
                                        <div className="row mb-3">
                                            <label htmlFor="refrcode" className="col-form-label">
                                                Coupon code
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control inputformcnt shadow-none"
                                                    aria-describedby="button-addon2"
                                                    placeholder="Enter Your Coupon Code"
                                                    onChange={(e) => {
                                                        setCoupanCode(e.target.value);
                                                        setCoupanApplied(false);
                                                    }}
                                                    value={coupanCode}
                                                    disabled={couponFetched}
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    id="button-addon2"
                                                    disabled={couponFetched}
                                                    onClick={() =>
                                                        applyCoupan({
                                                            coupon: coupanCode,
                                                            course_id: process.env.REACT_APP_COURSEID2,
                                                        })
                                                    }
                                                >
                                                    {couponFetched || couponApplied ? "Applied" : "Apply"}
                                                </button>
                                            </div>
                                            <div>
                                                {couponError && (
                                                    <p className="landingperror">
                                                        {" "}
                                                        Please enter coupon code
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="totlpriceee mt-2 mb-4">
                                        <div className="d-flex justify-content-between">
                                            Course Price :{" "}
                                            {courseDetail && courseDetail.course_sp == 0 ? (
                                                <span>{`₹${Number(courseDetail.mrp) + Number(courseDetail.tax)
                                                    }/-`}</span>
                                            ) : (
                                                <span
                                                    className={`text-muted ms-2 ${!couponApplied &&
                                                        courseDetail &&
                                                        Number(courseDetail.course_sp) !=
                                                        Number(courseDetail.mrp) +
                                                        Number(courseDetail.tax) &&
                                                        "last-price"
                                                        }`}
                                                >
                                                    {couponDiscount && courseDetail
                                                        ? `₹${Number(courseDetail.mrp) +
                                                        Number(courseDetail.tax)
                                                        }/-`
                                                        : courseDetail && `₹${courseDetail.course_sp}/-`}
                                                </span>
                                            )}
                                        </div>
                                        {couponApplied && (
                                            <div className="d-flex justify-content-between">
                                                Coupon Discount:{" "}
                                                <span className="text-dark current-price">
                                                    {couponDiscount && `-₹${couponDiscount.discount}/-`}
                                                </span>
                                            </div>
                                        )}
                                        {/*  Number(courseDetail.course_sp) != Number(courseDetail.mrp) + Number(courseDetail.tax) && */}
                                        {courseDetail && courseDetail.course_sp != 0 && (
                                            <div className="d-flex justify-content-between">
                                                {Number(courseDetail.course_sp) !=
                                                    Number(courseDetail.mrp) + Number(courseDetail.tax) ? (
                                                    <>
                                                        {couponApplied ? (
                                                            <p>
                                                                Final Price:{" "}
                                                                <span className="gstp">(Inclusive of GST)</span>
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                Offer Price:{" "}
                                                                <span className="gstp">(Inclusive of GST)</span>
                                                            </p>
                                                        )}
                                                        <span className="text-dark current-price">
                                                            {couponApplied && couponDiscount
                                                                ? `₹${Number(couponDiscount.mrp) +
                                                                Number(couponDiscount.tax)
                                                                }/-`
                                                                : `₹${Number(courseDetail.mrp) +
                                                                Number(courseDetail.tax)
                                                                }/-`}
                                                        </span>
                                                    </>
                                                ) : (
                                                    couponDiscount &&
                                                    Number(courseDetail.course_sp) !=
                                                    Number(couponDiscount.mrp) +
                                                    Number(couponDiscount.tax) && (
                                                        <>
                                                            {couponApplied ? (
                                                                <p>
                                                                    Final Price:{" "}
                                                                    <span className="gstp">
                                                                        (Inclusive of GST)
                                                                    </span>
                                                                </p>
                                                            ) : (
                                                                <p>
                                                                    Offer Price:{" "}
                                                                    <span className="gstp">
                                                                        (Inclusive of GST)
                                                                    </span>
                                                                </p>
                                                            )}
                                                            <span className="text-dark current-price">
                                                                {couponApplied && couponDiscount
                                                                    ? `₹${Number(couponDiscount.mrp) +
                                                                    Number(couponDiscount.tax)
                                                                    }/-`
                                                                    : `₹${Number(courseDetail.mrp) +
                                                                    Number(courseDetail.tax)
                                                                    }/-`}
                                                            </span>
                                                        </>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={throttle(handleSubmit, 2000)}
                                            className="btn  btn-enrollnw w-100"
                                        // onClick={handleOpenVideo}
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



                {/* <div className="modal fade" id="thankyou" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content thankyou-content">
                            <div className="text-end popupform-btn-close">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body thankyou-body text-center">
                                <img src="images/thankyou-gif.gif" className="w-50" />
                                <h3 className="text-black">Thank You! </h3>
                                <p>Your course details will be sent directly to your email id. Don't forget to check your spam
                                    folder as well.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}



                <div className="modal" tabIndex="-1" id="video1">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content video-modal-content">
                            <div className="modal-body">
                                <iframe className="videopopup" src="https://www.youtube.com/embed/zjbNNaTfXSA?si=f2663TpNNXCCyeoN"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                >
                                </iframe>
                            </div>
                            <button type="button" className="btn-close p-3 shadow-none btn-close-white" data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                            </button>
                        </div>
                    </div>
                </div>





                <div className="mt-5">
                    <div className="container">
                        <div className="row justify-content-center">

                            <div className=" offer">

                                <div className="card offer-card">
                                    <div className="row g-0 d-flex align-items-center">
                                        <div className="col-lg-6">
                                            <div className="p-3">
                                                <img src={offerImg} className="img-fluid rounded-start w-100"
                                                    alt="physics galaxy offer img" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card-body p-3 offer-card-body">
                                                <h5 className="text-center">PYQ TALKS for JEE ADVANCED 2024</h5>
                                                <div className="smallline mx-auto mb-3"></div>
                                                <p className="card-text mt-4">A short course to build Problem Solving Approach for
                                                    JEE Advanced.</p>
                                                <h4 className="mt-4"> - By Ashish Arora Sir</h4>

                                                <div className="leftside-btn mt-3">
                                                    <a type="button" 
                                                    // href="#" 
                                                    className="btn btn-lg btn-enroll "
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#buynow"
                                                    onClick={() => setActiveState(true)}>ENROLL NOW</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>



            </section>


            <section className="page-section-2 py-4 bg-light">
                <div className="container">
                    <div className="mb-2">
                        <div className="page-sect-2-title text-center">
                            <h1>Aim of the Series</h1>
                        </div>
                        <div className="smallline mx-auto mb-3"></div>
                    </div>

                    <div className="mt-4">
                        <div className="row">

                            <div className="col-md-6 mb-4">
                                <div className="sec-2-page-viso-course">
                                    <div className="d-flex">
                                        <span><i className="fa fa-play-circle-o mt-1 me-2" aria-hidden="true"></i></span>
                                        <p className="mb-0"><b>Understanding JEE Advanced Paper Design</b></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="sec-2-page-viso-course">
                                    <div className="d-flex">
                                        <span><i className="fa fa-play-circle-o mt-1 me-2" aria-hidden="true"></i></span>
                                        <p className="mb-0"><b>Judging Patience & Stress Handling</b>.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="sec-2-page-viso-course">
                                    <div className="d-flex">
                                        <span><i className="fa fa-play-circle-o mt-1 me-2" aria-hidden="true"></i></span>
                                        <p className="mb-0"><b>Evaluating Reading Ability</b>.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="sec-2-page-viso-course">
                                    <div className="d-flex">
                                        <span><i className="fa fa-play-circle-o mt-1 me-2" aria-hidden="true"></i></span>
                                        <p className="mb-0"><b>Assessing Perseverance</b>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="sec-2-page-viso-course">
                                    <div className="d-flex">
                                        <span><i className="fa fa-play-circle-o mt-1 me-2" aria-hidden="true"></i></span>
                                        <p className="mb-0"><b>Handling Time Pressure</b>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <div className="sec-2-page-viso-course">
                                    <div className="d-flex">
                                        <span><i className="fa fa-play-circle-o mt-1 me-2" aria-hidden="true"></i></span>
                                        <p className="mb-0"><b>Applying Knowledge Creatively</b>.
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="row">
                            <div className="">
                                <div className="page-sec-2-card">
                                    <div className="page-sec-2-card-text text-center p-4">
                                        <h3>In this course <b>PYQ TALKS</b>, using selected chapter wise PYQs and discussion
                                            students will be explained how to build <b>Strong Problem Solving Approach</b> for
                                            <b>JEE Advanced</b> exam.</h3>
                                    </div>
                                </div>

                                <div className="page-sec-2-card-btn mt-5 text-center">
                                    <a type="button" 
                                    // href="#" 
                                    className="btn btn-lg btn-enroll " 
                                    data-bs-toggle="modal"
                                    data-bs-target="#buynow"
                                    onClick={() => setActiveState(true)}>ENROLL NOW</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="page-section-5 py-4 bg-white">
                <div className="page-sec-5-img pg-bordrradius text-center">
                    <img src={ashishsir} alt="ashish sir" />
                </div>
                <div className="container">

                    <div className="row">
                        <div className="">


                            <div className="pafe-sec-5-text">
                                <div className="pabout-ashish mt-5">
                                    <h4>Nationally Acclaimed Educator, who has Mentored -</h4>
                                </div>
                                <ul>
                                    <li><strong>5 AIR-1 & 130+ Ranks</strong> in Top -100 in JEE Adv, JEE Main & NEET</li>
                                    <li><strong>10,000+</strong>IITians &<strong>15,000+</strong>Medicos</li>
                                    <li>The only dropper who secured <strong>AIR-1</strong> in IIT-JEE ever: <strong>Dungara Ram
                                        Choudhary (2002)</strong></li>
                                    <li><strong>AIR-1</strong> of JEE Adv with Historically highest score: <strong>Mridul
                                        Agarwal (348/360 in 2021)</strong></li>
                                    <li>First Ever Internaonal Gold Medal for India in IPhO at UK & also secured
                                        <strong>AIR-4</strong> in IIT-JEE: <strong>Navneet Loiwal (2000)</strong></li>
                                    <li><strong>21 Internaonal Medalists</strong> in Olympiads of Physics, Astronomy & Jr.
                                        Science</li>
                                    <li><strong>4 times</strong> Internaonal Medalist (2012, 2013, 2014, 2015) in Physics &
                                        Astronomy Olympiads : <strong>Sheshansh Agarwal</strong></li>
                                </ul>

                                <div className="pabout-ashish mt-5">
                                    <h4>Career Highlights -</h4>
                                </div>
                                <ul>
                                    <li><strong>30+ Years' experience;</strong> innovator of high result producing academic
                                        methodologies, student assessments and building success strategies for all types of
                                        students groups</li>
                                    <li>Academic mentor of 'Physics Galaxy' Youtube channel for JEE (Main+Adv) & NEET preparaon
                                        that has <strong>1.2 million+ subscribers and 23 crore+ views</strong></li>
                                    <li>Author of popular<strong>r ‘Physics Galaxy’ book series for JEE (Main+Adv)</strong>and 9
                                        other book tles on JEE (Main+Adv) & NEET, many of these books have been best seller on
                                        Amazon mulple mes</li>
                                    <li>Has been<strong>instrumental</strong> in leading instuons of JEE (Main+Adv) & NEET at
                                        various posions of Chief Academic Officer, Naonal Academic Head, Academic Director &
                                        Mentor</li>

                                </ul>


                            </div>
                        </div>
                    </div>


                    <div className="mt-4">
                        <div className="row">
                            <div className="">
                                <div className="page-sec-2-card">
                                    <div className="page-sec-2-card-text text-center p-4">
                                        <h1 className="mb-4"><span className="text-white"><b> PYQ TALKS </b></span> for <span
                                            className="text-white"><b> JEE ADVANCED </b></span> REVISION SERIES </h1>
                                        <h2>Offer Price
                                            <span className="text-danger ms-2"> <del>₹1999/-</del></span>
                                            <span className="text-white ms-2"><b> ₹999/- </b></span>
                                        </h2>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <section className="py-4 page-section-6">
                <div className="container">
                    <div className="row">
                        <div>
                            <div className="page-sect-2-title text-center">
                                <h1>Frequently Asked Questions (FAQs) </h1>
                            </div>
                            <div className="smallline mx-auto mb-3"></div>
                        </div>
                        <div className="mt-4">

                            <div className="accordion accordion-flush" id="faqlist">
                                <div className="accordion-item mb-3"
                                    onClick={() => {
                                        faqToggle.value !== 1 ? setFAQToggle({status: true, value:1}) : setFAQToggle({status: true, value:0})
                                    }}
                                >
                                    <h2 className="accordion-header">
                                        <button 
                                        className={`accordion-button ${faqToggle.status && faqToggle.value == 1 ? 'non-collapsed' : 'collapsed' } `} 
                                        type="button" 
                                        data-bs-toggle="collapse"
                                        data-bs-target="#faq-content-1">
                                            Q: How this PYQ TALKS course is helpful in JEE ADVANCE preparation?
                                        </button>
                                    </h2>
                                    <div 
                                    id="faq-content-1" 
                                    className={`accordion-collapse collapse accrdbtn ${faqToggle.status && faqToggle.value == 1 ? 'show' : ''}`}
                                    data-bs-parent="#faqlist">
                                        <div className="accordion-body">
                                            A: In this series with selective PYQs of JEE Advanced Physics Ashish Arora sir will
                                            explain the problem solving method and concept applications in new situations which
                                            are frequently asked in JEE Advanced every year.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mb-3"
                                    onClick={() => {
                                        faqToggle.value !== 2 ? setFAQToggle({status: true, value:2}) : setFAQToggle({status: true, value:0})
                                    }}
                                >
                                    <h2 className="accordion-header">
                                        <button 
                                        className={`accordion-button ${faqToggle.status && faqToggle.value == 2 ? 'non-collapsed' : 'collapsed' } `}
                                        type="button" 
                                        data-bs-toggle="collapse"
                                        data-bs-target="#faq-content-2">
                                            Q: Will All PYQs of JEE advanced of previous years will be solved in this series ?
                                        </button>
                                    </h2>
                                    <div 
                                    id="faq-content-2" 
                                    className={`accordion-collapse collapse accrdbtn ${faqToggle.status && faqToggle.value == 2 ? 'show' : ''}`}
                                    data-bs-parent="#faqlist">
                                        <div className="accordion-body">
                                            A: No. The purpose of this series is to enhance mental thinking of aspirants for
                                            learning applications of Physics in new situations on which questions are asked
                                            every year in JEE Advanced. So in this series selective PYQs are taken and
                                            variations of applications of concepts are covered to overall improve Physics
                                            applications in JEE Advanced level problem.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mb-3"
                                    onClick={() => {
                                        faqToggle.value !== 3 ? setFAQToggle({status: true, value:3}) : setFAQToggle({status: true, value:0})
                                    }}
                                >
                                    <h2 className="accordion-header">
                                        <button 
                                        className={`accordion-button ${faqToggle.status && faqToggle.value == 3 ? 'non-collapsed' : 'collapsed' } `}
                                        type="button" data-bs-toggle="collapse"
                                        data-bs-target="#faq-content-3">
                                            Q: How this series is different from PYQ video solutions?
                                        </button>
                                    </h2>
                                    <div 
                                    id="faq-content-3" 
                                    className={`accordion-collapse collapse accrdbtn ${faqToggle.status && faqToggle.value == 3 ? 'show' : ''}`} 
                                    data-bs-parent="#faqlist">
                                        <div className="accordion-body">
                                            A: For selective PYQs of every chapter taken in this series, concept applications
                                            with thinking methods and problem solving approach are explained not just the video
                                            solution to PYQs.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mb-3"
                                    onClick={() => {
                                        faqToggle.value !== 4 ? setFAQToggle({status: true, value:4}) : setFAQToggle({status: true, value:0})
                                    }}
                                >
                                    <h2 className="accordion-header">
                                        <button 
                                        className={`accordion-button ${faqToggle.status && faqToggle.value == 4 ? 'non-collapsed' : 'collapsed' } `}
                                        type="button" 
                                        data-bs-toggle="collapse"
                                        data-bs-target="#faq-content-4">
                                            Q: How many PYQs of JEE Advaced are taken in every chapter in this course ?
                                        </button>
                                    </h2>
                                    <div 
                                    id="faq-content-4" 
                                    className={`accordion-collapse collapse accrdbtn ${faqToggle.status && faqToggle.value == 4 ? 'show' : ''}`}
                                    data-bs-parent="#faqlist">
                                        <div className="accordion-body">
                                            A: For every chapter depending upon the chapter depth 6 to 12 PYQs are taken for
                                            explaining problem solving approach using concept applications in advance level
                                            problem.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mb-5"
                                    onClick={() => {
                                        faqToggle.value !== 5 ? setFAQToggle({status: true, value:5}) : setFAQToggle({status: true, value:0})
                                    }}
                                >
                                    <h2 className="accordion-header">
                                        <button 
                                        className={`accordion-button ${faqToggle.status && faqToggle.value == 5 ? 'non-collapsed' : 'collapsed' } `}
                                        type="button" 
                                        data-bs-toggle="collapse"
                                        data-bs-target="#faq-content-5">
                                            Q: How long will the access to this course will be open.
                                        </button>
                                    </h2>
                                    <div 
                                    id="faq-content-5" 
                                    className={`accordion-collapse collapse accrdbtn ${faqToggle.status && faqToggle.value == 5 ? 'show' : ''}`}
                                    data-bs-parent="#faqlist">
                                        <div className="accordion-body">
                                            A: The series will be accessible upto 31st May, 2024.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <footer>
                <div className="page-footer page-footer-2 shadow bg-black p-2">
                    <div className="footer-title text-center p-1 ">
                        © 2024
                        <a href="">Physics Galaxy</a>.
                        All rights reserved.
                    </div>
                </div>



                <div className="footer-btn-sticky shadow bg-black p-3">
                    <div className="leftside-btn">
                        <a type="button" 
                        // href="#" 
                        className="btn btn-lg btn-enroll " 
                        data-bs-toggle="modal"
                        data-bs-target="#buynow"
                        onClick={() => setActiveState(true)}>ENROLL NOW 
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}
