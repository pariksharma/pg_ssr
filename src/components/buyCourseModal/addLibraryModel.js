import React from "react";
import Modal from "../../components/modal/modal";
import { toast } from "react-hot-toast";
import {
  getMyProfileService,
  userLogoutService,
  userUpdateProfileService,
} from "../../services";
import { resHandler } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import "./addLibraryModel.css";
import Modal1 from "../modal1/modal1";

const checkmark = "/assets/images/check-mark_1.png";

export default function AddLibraryModel({ ModalOpen, CloseModal, value }) {
  const naviagate = useNavigate();

  return (
    <Modal isOpen={ModalOpen} onClose={() => { CloseModal(); naviagate(0) }}>
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-lg-12 col-md-12">
          <div className="cntrdive text-center m-2">
            <img src={checkmark} />
            <h5 className="mt-3 font-bold">You have successfully added  this free course.</h5>
            <p>You can find this course on My Library section.</p>
          </div>
          <div className="bilngdivve d-flex justify-content-center align-items-center pt-2 mb-3">
            <div>
              <button className="btn1" onClick={() => { naviagate(`/library`); CloseModal(); }}>
                Go To My Library
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* );
        })
      ) : (
        <NoDataFound />
      )} */}
    </Modal>
  );
}
