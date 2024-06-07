import React from "react";
import Modal from "../../components/modal/modal";
import { toast } from 'react-hot-toast';
import { getMyProfileService, userLogoutService, userUpdateProfileService } from '../../services';
import { resHandler } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

import "./logoutPopup.css"
import Modal1 from "../modal1/modal1";

const Logouticn = "/assets/images/Logout.png"

export default function LogoutPopup({ ModalOpen, CloseModal, value }) {
  const navigate = useNavigate();
  const handleLogoutButtonClick = async (e) => {
    e.preventDefault();
    await userLogoutService().then(res => {
      const { data, status, message } = resHandler(res);
      status && localStorage.clear();
      status && navigate(0);
      message && toast.success(message);
      // dispatch(logoutAction())
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <Modal1 isOpen={ModalOpen} onClose={() => CloseModal()} modalCenter={'modal-center'} modalCenter1={'md-main'}>

      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-lg-12 col-md-12">
          <div className="cntrdiv text-center">
            <h4>Logout</h4>
            <h5>Are you sure, you want to logout?</h5>
          </div>

          <div className="bilngdiv d-flex justify-content-center align-items-center pt-2 ">
            <div className="bilngdivfrst">
              <button onClick={() => CloseModal()}>Cancel</button>
            </div>
            <div>
              <button className="btn1" onClick={handleLogoutButtonClick}>Logout</button>
            </div>

          </div>


        </div>
      </div>
      {/* );
        })
      ) : (
        <NoDataFound />
      )} */}
    </Modal1>
  );
}
