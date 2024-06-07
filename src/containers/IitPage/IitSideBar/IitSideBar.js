import React, { useEffect, useState } from 'react'
import './IitSideBar.css'
import About_iits_assets from '../about/about_iits_assets'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useSearchParams } from 'react-router-dom';
import Header from '../../../components/header/header';
import LinkSend from '../../../components/linkSend/linkSend';
import Footer from '../../../components/footer/footer';

export default function IitSideBar() {
  const [iitParam, setIitParam] = useSearchParams()
  const [active, setActive] = useState()
  useEffect(() => {
    setActive(iitParam.get('name'))
  }, [iitParam])

  const handleSelect = (k) => {
    iitParam.set('name', k);
    setIitParam(iitParam)
  }

  return (
    <>
      <Header />
      <section className='bg-light'>
        <Tab.Container id="left-tabs-example" activeKey={active} onSelect={(k) => handleSelect(k)}>
          <Row>
            <Col md={3}>
              <Nav variant="pills" className="flex-column iit-custom-tabs">
                {
                  About_iits_assets.map((item, i) => {
                    return (
                      <Nav.Item key={i}>
                        <Nav.Link eventKey={item.to}>{item.text}</Nav.Link>
                      </Nav.Item>
                    )
                  })
                }
              </Nav>
            </Col>
            <Col md={9}>
              <Tab.Content>
                {
                  About_iits_assets.map((item, i) => {
                    return (
                      <Tab.Pane eventKey={item.to} key={i}>{item.page}</Tab.Pane>
                    )
                  })
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </section>
      <LinkSend />
      <Footer />
    </>
  )
}
