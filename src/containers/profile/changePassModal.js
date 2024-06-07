import React from "react";
import Modal from "../../components/modal/modal";
import { toast } from "react-hot-toast";
import {
  getMyProfileService,
  sendVerificationOtpService,
  updatePasswordService,
  userLogoutService,
  userUpdateProfileService,
} from "../../services";
import { resHandler, throttle } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import "./changePassModal.css";
import Modal1 from "../../components/modal1/modal1";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import Button5 from "../../components/Buttons/button5/button5";
import OTPInput from "react-otp-input";
import useInput from "../../components/useInput";
import { useEffect } from "react";
import Modal2 from "../../components/modal2/modal2";

const Logouticn = "/assets/images/Logout.png";

export default function ChangePassModal({ ModalOpen, CloseModal, value }) {
  const {
    value: password,
    bind: bindPassword,
    setValue: setPassword,
  } = useInput("");
  const {
    value: confirmPassword,
    bind: bindConfirmPassword,
    setValue: setConfirmPassword,
  } = useInput("");
  const [PasswordError, setPasswordError] = useState("");
  const naviagate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const invalidPattern = /^0000000000$/;
  const [MobileNumberError, setMobileNumberError] = useState(false);
  const [otpVerified, setOtpVerfied] = useState(false);
  const [InvalidPatternError, setInvalidPatternError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [otp, setOtp] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const initialTime = 60; // 3 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const handlePhoneChange = (value, country) => {
    const phoneNumberWithoutCountry = value.replace(`${country.dialCode}`, "");
    setPhoneNumber(phoneNumberWithoutCountry);
    setCountryCode(country.dialCode);
  };

  useEffect(() => {
    let interval;
    if (!isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(true);
    }

    return () => clearInterval(interval);
  }, [timeRemaining]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const handleLogoutButtonClick = async (e) => {
    e.preventDefault();
    await userLogoutService()
      .then((res) => {
        const { data, status, message } = resHandler(res);
        status && sessionStorage.clear();
        status && naviagate(0);
        message && toast.success(message);
        // dispatch(logoutAction())
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendOtpClick = async () => {
    setMobileNumberError(false);
    setInvalidPatternError(false);
    // const phoneNumberWithoutPrefix = phoneNumber ? phoneNumber.slice(2) : '';
    if (!invalidPattern.test(phoneNumber)) {
      if (phoneNumber.length > 7 && phoneNumber.length <= 15) {
        const formData = new FormData();

        formData.append("mobile", phoneNumber);
        formData.append("resend", 0);
        formData.append("is_registration", 0);

        await sendVerificationOtpService(formData)
          .then((res) => {
            const { status, data, message } = resHandler(res);
            status && toast.success(message);
            status && setOtpSent(!otpSent);
            !status && message && toast.error(message);
          })
          .catch((err) => console.log(err));
      } else {
        if (phoneNumber.length < 7 || phoneNumber.length > 15) {
          setMobileNumberError(true);
          // toast.error('Mobile No. should be 7 to 10 Digits');
        }
      }
    } else {
      setInvalidPatternError(true);
    }
    // setOtpSent(!otpSent)}
  };

  const handleOtpChange = (newOtp) => {
    const numericOtp = newOtp.replace(/\D/g, "");
    setOtp(numericOtp);
  };

  const handleVerifyOtpClick = async () => {

    setOtpError(false);
    if (otp.length >= 6) {
      const formData = new FormData();
      // const phoneNumberWithoutPrefix = phoneNumber.slice(2)
      formData.append("mobile", phoneNumber);
      formData.append("resend", 0);
      formData.append("is_registration", 0);
      formData.append("device_id", "asdx");
      formData.append("device_token", "asdx");
      formData.append("c_code", countryCode);
      formData.append("otp", otp);
      await sendVerificationOtpService(formData)
        .then((res) => {
          const { status, data, message } = resHandler(res);
          !status && message && toast.error(message);
          status && toast.success(message);
          status && setOtpVerfied(true);
          !status && message && message == "OTP expired" && naviagate(0);
        })
        .catch((err) => console.log(err));
    } else {
      setOtpError(true);
    }
    // setOtpSent(!otpSent)
    // setOtpVerfied(true);
  };
  const handleResendOtp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const phoneNumberWithoutPrefix = phoneNumber.slice(2)
    formData.append("mobile", phoneNumberWithoutPrefix);
    formData.append("resend", 1);
    formData.append("is_registration", 1);
    // formData.append('otp',otp);
    await sendVerificationOtpService(formData)
      .then((res) => {
        const { status, data, message } = resHandler(res);
        console.log(res, "resend")
        if (status) {

          toast.success(message);
          setIsActive(false);
          setTimeRemaining(60);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleUpdatePasswordClick = async (e) => {
    setPasswordError("");
    if (password.length >= 8) {
      if (password == confirmPassword) {
        e.preventDefault();
        const formData = new FormData();
        // const phoneNumberWithoutPrefix = phoneNumber.slice(2)
        formData.append("mobile", phoneNumber);
        formData.append("otp", otp);
        formData.append("password", password);
        await updatePasswordService(formData)
          .then((res) => {
            let { data, status, message } = resHandler(res);
            !status && message && toast.error(message);
            status &&
              message &&
              toast.success(message);
            status && CloseModal();
            if (status) {
              naviagate("/");
              setPhoneNumber("");
              setOtp("");
              setOtpVerfied(false);
              setOtpSent(false);
              setConfirmPassword("");
              setPassword("");
            }
            // naviagate('/')
          })
          .catch((err) => console.log(err));
      } else {
        setPasswordError("Password not match, Please re-enter you confirm password.");
      }
    } else {
      setPasswordError("Password length should be greater than 7.");
    }
  };
  return (
    <Modal2 isOpen={ModalOpen} onClose={() => CloseModal()}>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-lg-12 col-md-12">
          <div className="cntrdivv text-center">
            {!otpVerified ? <h3 className=" fw-400 mb-3"> {otpSent ? 'Enter OTP12' : 'Change Your Password'}</h3> : <h3 className="fw-bold mb-3"> Create New Password{" "} </h3>}
          </div>
          {otpVerified ? (
            <div className="text-center">
              <form id="form-init">
                <div className="text-center">
                  <div className="input-group verification-code--inputs inputs-pwd mb-3 mx-auto">
                    <input type={showPassword ? 'text' : 'password'} className="form-control inputs-pwd shadow-none w-100 pwd" placeholder="Password" {...bindPassword} />
                    <span className="cursor" onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword) }}> <i className={`bi bi-eye${showPassword ? '-slash' : ''}`} id="togglePassword"></i></span>
                    <br />
                  </div>
                  <div className="input-group verification-code--inputs inputs-pwd mb-3 mx-auto d-block">
                    <input type={showPasswordTwo ? 'text' : 'password'} className="form-control inputs-pwd shadow-none w-100 border pwd" name="confirmPassword" placeholder="Confirm Password" {...bindConfirmPassword} />
                    <span className="cursor" onClick={(e) => { e.stopPropagation(); setShowPasswordTwo(!showPasswordTwo) }}> <i className={`bi bi-eye${showPasswordTwo ? '-slash' : ''}`} id="togglePasswordTwo"></i></span>
                  </div>
                  {PasswordError && <p className="error">{PasswordError}</p>}
                </div>

                <div className="text-center my-3">
                  <Button5 type="button" name={"Continue"} onButtonClick={handleUpdatePasswordClick} />
                </div>
              </form>
            </div>
          ) : (
            <div className="bilngdiv d-flex justify-content-center align-items-center pt-2">
              {!otpSent ? (
                <form id="form-init" onSubmit={throttle(handleSendOtpClick, 2000)} >
                  <PhoneInput countryCodeEditable={false} country="in" value={countryCode + phoneNumber} onChange={handlePhoneChange} />
                  {InvalidPatternError && <p>Example: 5551234567</p>}
                  {MobileNumberError && (<p className="error">Please enter valid mobile number.</p>)}
                  <div className="text-center my-3">
                    <button type="button" className="btn btn-5 border-0 shadow-none" onClick={throttle(handleSendOtpClick, 2000)} > <span>Send OTP</span> </button>
                  </div>
                  {/* :
                  <Button5 type='button' name={"Verify OTP"}  onButtonClick={throttle(handleVerifyOtpClick, 2000)}/> */}
                </form>
              ) : (
                <form onSubmit={throttle(handleVerifyOtpClick, 2000)}>
                  <div className="verification-code--inputss shadow-none">
                    <p>We have sent the OTP on +{countryCode} {phoneNumber}</p>
                    <OTPInput value={otp} onChange={handleOtpChange} numInputs={6} shouldAutoFocus={true} renderInput={(props) => <input {...props} />} />
                    {otpError && (<p className="error mb-0">Please enter a valid OTP.</p>)}{" "}
                    {otpSent && (<div className="my-2"> {!isActive ? <div id="countdown">{formatTime(timeRemaining)}</div> : <p className="text-end"> Didn’t Receive OTP?{" "} <button className="resendotpp" type="button" disabled={!isActive} onClick={handleResendOtp} > Resend OTP </button> </p>} </div>)}
                    <div className="">
                      <Button5 type="button" name={"Verify OTP"} onButtonClick={throttle(handleVerifyOtpClick, 2000)} />
                      <div className="gobacklink text-center my-3">
                        <button type="button" className='changemobile fw-bold' onClick={() => { setOtpSent(false); setOtp(); setPhoneNumber(); }}> Change Mobile Number</button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              <div></div>
            </div>
          )}
        </div>
      </div>
      {/* );
        })
      ) : (
        <NoDataFound />
      )} */}
    </Modal2>
  );
}
