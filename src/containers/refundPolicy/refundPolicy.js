import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import LinkSend from "../../components/linkSend/linkSend";
import Footer from "../../components/footer/footer";
import { refundPolicyService } from "../../services";
import { resHandler } from "../../utils/helper";
import { useQuery } from "react-query";

export default function RefundPolicy() {
  const [refundPolicies, setRefundPolicies] = useState();

  /*
  useEffect(() => {
    fetchRefundPolicy();
  }, []);
  const fetchRefundPolicy = () => {
    refundPolicyService()
      .then((res) => {
        // let {data, status, message} = resHandler(res);
        setRefundPolicies(res.data);
        console.log(res, "refundPolicy")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  */

   //////////////Caching on refundPolicyService (refund)////////////////////////

   const fetchRefundPolicyService = async () => {
      const responseRefundService = await refundPolicyService()
      console.log("refundResponse", responseRefundService)
      return responseRefundService.data
   }

   const {data : refund_data, isFetched} = useQuery("refund_Policy_Service", fetchRefundPolicyService, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   })

   useEffect(() => {
      if(isFetched){
        // console.log("refund", data);
        setRefundPolicies(refund_data);
      }
   }, [isFetched])

   ////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Header />

      <section className="pg-privacypolicy pb-4">
        <div className="container">
          <div className="bg-white py-4 shadow">
            <div className='p-4 pg-privacypolicy-text' dangerouslySetInnerHTML={{ __html: refundPolicies && refundPolicies }} />
          </div>
        </div>
      </section>

      <LinkSend />
      <Footer />
    </>
  );
}
