import React from "react";

const footerStyle = {
  position: "relative",
  bottom: 0,
  width: "100%",
  backgroundColor: "#fcfcfc",
  borderTop: "1px solid #eaeaea",
  color: "#6c757d",
  padding: "20px 0",
  fontSize: "12px",
};

const Footer = () => (
  <footer
    className="page-footer font-small text-center"
    style={footerStyle}
  >
    <div className="container">
      Made by the students of CSIT Department.
    </div>
  </footer>
);

export default Footer;
