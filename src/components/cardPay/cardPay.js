import React, { useEffect, useState } from "react";
import "./cardPay.css";

import Button4 from "../Buttons/button4/button4";
import { Link } from "react-router-dom";
import {
  couponVerifyService,
  getCouponService,
  getFPaymentService,
  getPayGateWayService,
} from "../../services";
import { resHandler, stringToFloat } from "../../utils/helper";
// import Modal from '../modal/modal'
import Button5 from "../Buttons/button5/button5";
import Button7 from "../Buttons/button7/button7";

import PaymentGatewayModal from "../paymentGatewayModal/paymentGatewayModal";
import TestLoading from "../../containers/testLoading/testLoading";
import useRazorpay from "react-razorpay";
import toast from "react-hot-toast";

const CopanImage = "/assets/images/copan.png";
const Discounticon = "/assets/images/discount (4) 1.png";

export default function CardPay({ detail, id, sendDataToParent, loading }) {
  const [Razorpay] = useRazorpay();
  const [openModal, setOpenModal] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [paymentGatewayList, setPaymentGatewayList] = useState();
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState();
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [coupanCode, setCoupanCode] = useState("");
  const [exCoupanCode, setExCoupanCode] = useState("");
  const [couponApplied, setCoupanApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState();
  const [couponFetched, setCouponFetched] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [courseId, setCourseId] = useState();
  const [couponReadOnly, setCouponReadOnly] = useState(false);
  const [exCouponReadOnly, setExCouponReadOnly] = useState(false);
  const handleCheckBox = (e) => {
    setCheckData(e.target.checked);
    // console.log(e.target.checked)
  };
  useEffect(() => {
    if (typeof id != "undefined") {
      const stringWithoutUnderscore = id.replace(/_/g, "");
      getCoupons(stringWithoutUnderscore);
      setCourseId(stringWithoutUnderscore);
    }
  }, [id]);
  const handleButtonClick = async () => {
    console.log("ghfd")
    // e.preventDefault();
    // handlePayment();
    setOpenModal(true);
    //  await getPayGateWayService().then(res =>{
    //   let {status, data, message} = resHandler(res);
    //   console.log(data)
    //   setPaymentGatewayList(data);
    //  })
  };
  const handleSelectedPaymentGateway = (value) => {
    // console.log(value, "selectedPayemtn");
    handlePayment(value);
    // handlePayment()
    // console.log(e.target.value)
    // setSelectedPaymentGateway(e.target.value)
  };

  const getCoupons = async (value) => {
    const formData = new FormData();
    formData.append("course_id", value);
    formData.append("parent_id", "");
    await getCouponService(formData)
      .then((res) => {
        let { status, data, message } = resHandler(res);

        if (status) {
          const coupon = data.find((item) => item.coupon.coupon_type == "2");
          const fill_type = data[0].coupon.target_type;
          const coupon_detail = {
            coupon: coupon && coupon.coupon.coupon_tilte,
            course_id: coupon && coupon.id,
          };
          // console.log("uiop   ", data)
          if (status && coupon && fill_type == "2") {
            applyCoupon(coupon_detail);
            // setPreAppliedCoupon(true);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const applyCoupon = async (value) => {
    console.log("val", value)
    const { coupon, external_coupon, course_id } = value;

    // console.log("ppppppp", coupon);
    // Check if either coupon or external_coupon is provided
    if (!(coupon || external_coupon)) {
      setCouponError(true);

      setCoupanApplied(false);
      setCoupanCode("");
      setExCoupanCode("");
      setCouponFetched(false);

      return;
    }

    const formData = new FormData();

    if (coupon) formData.append("coupon_code", coupon);
    if (external_coupon) formData.append("external_coupon", external_coupon);

    formData.append("course_id", course_id);

    try {
      const res = await couponVerifyService(formData);
      const { status, data, message } = resHandler(res);

      if (status && ["0", "1", "2"].includes(data[0].external_coupon_remark)) {
        setCoupanApplied(true);
        toast.success("Coupon Applied Successfully.");
        setCouponDiscount(data[0]);
        if (coupon && status) {
          console.log("mmmmmmm");
          setCouponReadOnly(true);
        }
        if (external_coupon && status) {
          console.log("nnnnnn");
          setExCouponReadOnly(true);
        }
      } else {
        const errorMessage = data ? data[0].external_coupon_remark : message;
        toast.error(errorMessage);
        setCoupanApplied(false);
        setCoupanCode("");
        setExCoupanCode("");
        setCouponFetched(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while applying the coupon.");
    }
  };

  // const applyCoupon = async (value) => {
  //   const formData = new FormData();
  //   // setCouponError(false);
  //   if (value.coupon?.length || value.external_coupon?.length) {
  //     if (value.external_coupon?.length && value.coupon?.length) {
  //       formData.append("coupon_code", value.coupon);
  //       formData.append("external_coupon", value.external_coupon);
  //     } else if (value.coupon?.length)
  //       formData.append("coupon_code", value.coupon);
  //     else if (value.external_coupon?.length) {
  //       formData.append("external_coupon", value.external_coupon);
  //     }

  //     formData.append("course_id", value.course_id);
  //     await couponVerifyService(formData)
  //       .then((res) => {
  //         const { status, data, message } = resHandler(res);

  //         if (status && (data[0].external_coupon_remark == 0 || data[0].external_coupon_remark == 1 || data[0].external_coupon_remark == 2)) {
  //           setCoupanApplied(true);
  //           setCouponDiscount(data[0]);
  //           return true;
  //         } else {
  //           if (data)
  //             message && toast.error(data[0].external_coupon_remark);
  //           else
  //             message && toast.error(message);

  //           setCoupanApplied(false);
  //           setCoupanCode("");
  //           setExCoupanCode("");
  //           setCouponFetched(false);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     setCouponError(true);
  //   }
  // };

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handlePayment = async (value) => {
    console.log("cdcd", couponDiscount);
    loading(true);
    const formData = new FormData();
    formData.append("type", 1);
    formData.append("course_id", courseId);
    formData.append(
      "course_price",
      stringToFloat(
        couponApplied && couponDiscount ? couponDiscount.mrp : detail.mrp
      )
    );
    formData.append(
      "tax",
      stringToFloat(
        couponApplied && couponDiscount ? couponDiscount.tax : detail.tax
      )
    );
    // formData.append("tax", stringToFloat(detail.tax));
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

    formData.append("external_coupon", couponApplied ? exCoupanCode : 0);
    await getFPaymentService(formData)
      .then((res) => {
        let { data, status, message } = resHandler(res);
        let key = value.mid;
        if (status) {
          // console.log(value, "value")
          if (value.meta_name == "RZP_DETAIL") {
            // let key = value.mid;
            loading(false);
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
                // console.log(res, "res");
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
            });
            rzp1.open();
          }
          if (value.meta_name == "EASEBUZZ_DETAIL") {
            paymentGateWay(data.txnToken, key);
          }
        } else {
          loading(false);
          toast.error(message);
        }
        // paymentGateWay(data.txnToken,key);
        status && loading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paymentGateWay = async (acc_key, key) => {
    var easebuzzCheckout = new window.EasebuzzCheckout(
      key,
      process.env.REACT_APP_TYPE
    );
    var options = {
      access_key: acc_key, // access key received via Initiate Payment
      onResponse: (response) => {
        console.log(response);
        // post_transaction_id
        const order_details = {
          txnid: response.txnid,
          payid: response.easepayid,
          pay_via: 9,
        };
        let status = response.status == "success" ? 1 : 0;
        loading(true);
        payemntConfirmation(status, order_details);
        //   const formData = new FormData();
        //   formData.append('type', 2);
        //   formData.append('course_id', courseId);
        //   formData.append('course_price', stringToFloat(detail.mrp));
        //   formData.append('tax',stringToFloat(detail.tax));
        //   formData.append('pay_via', 9);
        //   formData.append('coupon_applied', 0);
        //   formData.append('pre_transaction_id',response.txnid);
        //   formData.append('transaction_status', status);
        //   formData.append('post_transaction_id', response.easepayid);
        //    getFPaymentService(formData).then(res =>{
        //     let {data, status, message} = resHandler(res);
        //   //  status && console.log(data)
        //    status && sendDataToParent(order_details);
        //    loading(false)

        // }).catch(err =>{
        //   console.log(err)
        // })
      },
      theme: "#123456", // color hex
    };

    await easebuzzCheckout.initiatePayment(options);
    // console.log(JSON.stringify(selectedPaymentGateway))
  };

  const payemntConfirmation = (status, data) => {
    // let status = response.status == "success" ? 1 : 0;
    loading(true);
    setPaymentLoading(true);
    const formData = new FormData();
    formData.append("type", 2);
    formData.append("course_id", courseId);
    {
      couponApplied
        ? formData.append("course_price", stringToFloat(couponDiscount.mrp))
        : formData.append("course_price", stringToFloat(detail.mrp));
    }

    {
      couponApplied
        ? formData.append("tax", stringToFloat(couponDiscount.tax))
        : formData.append("tax", stringToFloat(detail.tax));
    }

    formData.append("pay_via", data.pay_via);
    formData.append(
      "coupon_applied",
      couponApplied ? couponDiscount.coupon.id : 0
    );
    formData.append("pre_transaction_id", data.txnid);
    formData.append("transaction_status", status);
    formData.append("post_transaction_id", data.payid);

    getFPaymentService(formData)
      .then((res) => {
        let { status, message } = resHandler(res);
        setPaymentLoading(false);
        loading(false);
        if (status) {
          // console.log(data, 'data')
          status && sendDataToParent(data);
          loading(false);
        }
        //  localStorage.clear();
        else {
          loading(false);
          message && toast.error("Payment Failed!, Please try again!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sum = (num1, num2) => {
    return (num1 + num2).toFixed(2);
  };

  const removeCoupan = async (value) => {
    if (value === "coupanCode") {
      if(coupanCode !== ""){
        console.log("hell")
        setCoupanCode("");
        setCouponReadOnly(false);
        await applyCoupon({
          coupon: "",
          external_coupon: exCoupanCode,
          course_id: courseId,
        });
      }
    }
    if (value === "exCoupanCode") {
      if(exCoupanCode !== ""){
        setExCoupanCode("");
        setExCouponReadOnly(false);
        await applyCoupon({
          coupon: "",
          external_coupon: "",
          course_id: courseId,
        });
      }
    }
  };
  return (
    <div className="text-center vjed_sub_all card-order ">
      {/* {paymentLoading && <TestLoading/>} */}
      {openModal && (
        <PaymentGatewayModal
          isOpen={openModal}
          isClose={() => setOpenModal(false)}
          selectedGateway={handleSelectedPaymentGateway}
        />
      )}

      <div className="card vjed-card border-0 shadow radious_all">
        <div className="vjed-order-heading">
          <h5 className="text-center mt-2">Order Summary</h5>
        </div>
        {/* <div className="vjed-copan-card m-2  px-2 rounded">
                            <div className="d-flex align-items-center">
                                <img src={CopanImage} className=" me-2"/>
                                <h6 className="text-center mt-2"><b>Have Coupan?</b></h6>
                            </div>
                            <div className="text-center">
                              <h6 className="mt-2"> |&nbsp;&nbsp;<b>Add Coupan</b></h6>
                            </div>
                         </div>  */}

        <div className="vjed-price m-2 px-1">
          <div className="couponalldiv">
            <form
              onSubmit={(e) => {
                applyCoupon({
                  coupon: coupanCode,
                  external_coupon: exCoupanCode,
                  course_id: courseId,
                });
                e.preventDefault();
              }}
              className="d-flex align-items-center justify-content-between"
            >
              {/* <div className="frstcoupon d-flex px-2">
                <img className="hvecoupnimg mt-1 me-1" src={Discounticon} />
                <input
                  type="text"
                  value={coupanCode}
                  className="hvecoupn"
                  placeholder="Have Coupon?"
                  onChange={(e) => setCoupanCode(e.target.value)}
                />
              </div>
              <div
                className="px-1"
                onClick={() =>
                  applyCoupon({ coupon: coupanCode, external_coupon: exCoupanCode, course_id: courseId })
                }
              >
                <h6 className="addcouponh mt-2"> Add Coupon</h6>
              </div> */}

              <div className="frstcoupon d-flex px-2">
                <img className="hvecoupnimg mt-1 me-1" src={Discounticon} />
                <input
                  type="text"
                  value={coupanCode}
                  className="hvecoupn"
                  placeholder="Have Coupon?"
                  onChange={(e) => setCoupanCode(e.target.value)}
                  readOnly={couponReadOnly}
                />
                <div onClick={() => removeCoupan("coupanCode")}>
                  <i className="fa fa-trash ms-2" aria-hidden="true"></i>
                </div>
              </div>
              <div
                className=" px-1"
                // onClick={() =>
                //   applyCoupon({ coupon: coupanCode, course_id: courseId })
                // }
              >
                {/* <h6 className="addcouponh mt-2"> Add Coupon</h6> */}
                <Button7
                  type="submit"
                  // onButtonClick={() => applyCoupon({ coupon: coupanCode, external_coupon: exCoupanCode, course_id: courseId })}
                  name="Add Coupon"
                  disabled={coupanCode === ""}
                />
              </div>
            </form>

            <form
              onSubmit={(e) => {
                applyCoupon({
                  coupon: coupanCode,
                  external_coupon: exCoupanCode,
                  course_id: courseId,
                });
                e.preventDefault();
              }}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="frstcoupon d-flex px-2">
                <img className="hvecoupnimg mt-1 me-1" src={Discounticon} />
                <input
                  type="text"
                  value={exCoupanCode}
                  className="hvecoupn"
                  placeholder="Have External Coupon?"
                  onChange={(e) => setExCoupanCode(e.target.value)}
                  readOnly={exCouponReadOnly}
                />
                <div onClick={() => removeCoupan("exCoupanCode")}>
                  <i className="fa fa-trash ms-2" aria-hidden="true"></i>
                </div>
              </div>
              <div
                className="px-1"
                // onClick={() =>
                //   applyCoupon({ coupon: coupanCode, external_coupon: exCoupanCode, course_id: courseId })
                // }
              >
                {/* <h6 className="addcouponh mt-2"> Add Coupon</h6> */}
                <Button7
                  type="submit"
                  // onButtonClick={() => applyCoupon({ coupon: coupanCode, external_coupon: exCoupanCode, course_id: courseId })}
                  name="Add Coupon"
                  disabled={exCoupanCode === ""}
                />
              </div>
            </form>
          </div>
          {couponApplied && (
            <div className="d-flex align-items justify-content-center">
              <div className="coupnappl text-center">
                <h6 className="mt-2">
                  <b>Coupon Applied</b>
                </h6>
              </div>
            </div>
          )}
          <div className="d-flex align-items justify-content-between">
            <div className="text-center">
              <h6 className="mt-2">
                <b>Package Price</b>
              </h6>
            </div>
            <div className="text-center">
              <h6 className="mt-2">
                {" "}
                <span className="mt-2">
                  {" "}
                  <b>
                    RS{" "}
                    {couponApplied && couponDiscount
                      ? couponDiscount.mrp
                      : detail.mrp}
                    /-
                  </b>
                </span>
              </h6>
            </div>
          </div>
          <div className="d-flex align-items justify-content-between">
            <div className="text-center">
              <h6 className="mt-2">
                <b>GST</b>
              </h6>
            </div>
            <div className="text-center">
              <h6 className="mt-2">
                {" "}
                <b>
                  RS{" "}
                  {couponApplied && couponDiscount
                    ? couponDiscount.tax
                    : detail.tax}
                  /-
                </b>
              </h6>
            </div>
          </div>
          <div className="d-flex align-items justify-content-between">
            <div className="text-center">
              <h6 className="mt-2">
                <b>Total Price</b>
              </h6>
            </div>
            <div className="text-center">
              <h6 className="mt-2">
                {" "}
                <b>
                  RS{" "}
                  {couponApplied && couponDiscount
                    ? sum(
                        Number(couponDiscount.mrp),
                        Number(couponDiscount.tax)
                      )
                    : sum(Number(detail.mrp), Number(detail.tax))}
                  /-
                </b>
              </h6>
            </div>
          </div>

          <div className="vjed-check">
            <div className="my-1">
              <input
                type="checkbox"
                className="form-check-input shadow-none me-2"
                style={{ border: "2px solid black" }}
                id="exampleCheck1"
                onChange={handleCheckBox}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                I have read all<Link to={"/"}> Terms & Conditions</Link>
              </label>
            </div>
          </div>
        </div>
        {/* <a href="#" className="btn btn-outline shadow-none">Proceed To Pay</a> */}
        <div className="text-center mb-3 p-2">
          {detail.is_purchased === `1` ? (
            <Button5 disabled name={"PURCHASED"} />
          ) : (
            <Button5
              name={"Proceed To Pay"}
              onButtonClick={()=>handleButtonClick()}
              disabled={!checkData || detail.validity === "0 Days"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
