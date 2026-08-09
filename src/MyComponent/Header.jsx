import React from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";

const Header = () => {
  const headerStyle = {    
    backgroundColor: "rgb(210 210 210)",
    color: "#333",
    fontWeight: "bold",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  };
 
  return (
    <>
      <Row style={headerStyle}>
        <Col>
          <Navbar expand="sm" >
            <Container>
              <Navbar.Brand href="/">
                  <img style={{ height: "60px", width: "auto" }} src={process.env.PUBLIC_URL + '/acropolis-logo.png'} alt="Acropolis Logo" className="align-center" />
              </Navbar.Brand>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </>
  );
};

export default Header;