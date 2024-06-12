import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const Help = () => {
    return (
        <div className="py-5 bg-dark text-light vh-100">
            <h1 className="text-center mb-5">Contact Us</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <center>
                        <h3>Send Us a Message</h3>
                        <h4>Admin : admin@gmail.com</h4>
                        <div className="mt-4">
                            Contact : 012-3456789
                        </div>
                    </center>
                </Col>
            </Row>

            <div className=" pt-5" style={{ backgroundColor: "#1A1A1A", textAlign: "center" , marginTop:'300px'}}>
                <Container>
                    <h2 className="mb-4">Need Further Assistance?</h2>
                    <p>
                        If you have any questions, concerns, or need further assistance, feel free to contact us at
                        support@example.com
                    </p>
                </Container>
            </div>
        </div>
    );
};

export default Help;
