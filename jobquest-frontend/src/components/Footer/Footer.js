import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start mt-5 py-5" style={{backgroundColor: '#251E1E', color: "white", overflow: "hidden"}}>
            <Container>
                <Row>
                    <Col md={4} lg={4} xl={4} className="mb-4">
                        <h6 className="text-uppercase mb-4 font-weight-bold">JobQuest</h6>
                        <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </Col>
                    <Col md={2} lg={2} xl={2} className="mb-4">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                        <p><a href="#!" className="text-white">MDBootstrap</a></p>
                        <p><a href="#!" className="text-white">MDWordPress</a></p>
                        <p><a href="#!" className="text-white">BrandFlow</a></p>
                        <p><a href="#!" className="text-white">Bootstrap Angular</a></p>
                    </Col>
                    <Col md={3} lg={3} xl={3} className="mb-4">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                        <p><a href="#!" className="text-white">Your Account</a></p>
                        <p><a href="#!" className="text-white">Become an Affiliate</a></p>
                        <p><a href="#!" className="text-white">Shipping Rates</a></p>
                        <p><a href="#!" className="text-white">Help</a></p>
                    </Col>
                    <Col md={3} lg={3} xl={3} className="mb-4">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                        <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                        <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                        <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                        <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                    </Col>
                </Row>
            </Container>
            <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                © 2020 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
        </footer>
    );
};

export default Footer;
