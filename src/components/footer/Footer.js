import React from "react";
import "./Footer.css";
import images from "../../assets";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="partner-logos">
        <img src={images.instagram} alt="Partner 1" />
        <img src={images.linkedin} alt="Partner 2" />
        <img src={images.youtube} alt="Partner 3" />
        <img src={images.eusi} alt="Partner 4" />
      </div>
      <p style={{ color: "black", fontSize: "10px" }}>
        &copy; 2023 Orbital Edge Imaging. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
