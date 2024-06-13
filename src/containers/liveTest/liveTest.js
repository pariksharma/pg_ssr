import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import LinkSend from "../../components/linkSend/linkSend";
import Footer from "../../components/footer/footer";
import UserDetails from "../../components/userDetails/userDetails";
import { Tabs } from "react-bootstrap";
import Tab from "../viewDetail/tab";
import EventListCard from "../eventList/eventListCard";
import NoDataFound from "../noDataFound/noDataFound";
import "../purchaseHistory/purchaseHistory.css";

export default function LiveTest() {
  const [key, setKey] = useState("live");

  return (
    <>
      <Header />
      <section className="py-4 pg-userprofile-section">
        <div className="container">
          <div className="section-user-profile">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <UserDetails />
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="profile-title">
                  <h4 className="fw-bold">Live Test</h4>
                </div>
                <hr />
                <div className="rounded-3">
                  <div className="p-2 rounded-3 bg-white shadow">
                    <Tabs
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="mb-1 mt-1 position-relative ul_slide purchase_crse justify-content-start"
                      id="ul_slide"
                    >
                      <Tab eventKey={"live"} title="Live Test">
                        {/* {/ Display course purchase history /}
                        {/ Map over courseList /} */}
                        <div className="text-center">
                          <div className="pg-no-data-found">
                            <NoDataFound height={'50vh'} />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey={"upcoming"} title="Upcoming Test">
                        {/* {/ Display course purchase history /}
                        {/ Map over courseList /} */}
                        <div className="text-center">
                          <div className="pg-no-data-found">
                            <NoDataFound height={'50vh'} />
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey={"complete"} title="Completed Test">
                        {/* {/ Display event purchase history /}
                        {/ Map over eventList /} */}
                        <div className="text-center">
                          <div className="pg-no-data-found">
                            <NoDataFound height={'50vh'} />
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LinkSend />
      <Footer />
    </>
  );
}