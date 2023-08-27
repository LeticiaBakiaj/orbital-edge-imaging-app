import React from "react";
import "./Header.css";
import Search from "./Search";
import images from "../../assets";

const Header = ({ loginData, handleSearch }) => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <img src={images.logo} alt="Logo" className="logo" />
        <h1>Orbital Edge Imaging</h1>
      </div>
      <Search loginData={loginData} handleSearch={handleSearch} />
    </header>
  );
};

export default Header;
