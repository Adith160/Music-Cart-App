import React, { useState, useEffect } from "react";
import styles2 from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import callPng from "../../assets/Icons/Call.png";
import logo from "../../assets/Icons/logo.png";

function Header() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLoggedIn = !!localStorage.getItem("name");

  const toggleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className={styles2.headerDiv}>
      {isMobile ? (
         <div className={styles2.logo}>
         <img src={logo} alt="logo" />
         Music Cart
       </div>
      ) : (
        <>
          <span id="phone">
            {" "}
            <img src={callPng} alt="Call" /> 912121131313
          </span>
          <span id="shopNow">Get 50% off on selected items | Show Now</span>
          {isLoggedIn ? (
            <div className={styles2.btns}>
              <span onClick={() => toggleLogout()}>Logout</span>|
            </div>
          ) : (
            <div className={styles2.btns}>
              <span onClick={() => navigate("/login")}>Login</span>|
              <span onClick={() => navigate("/register")}>Signup</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Header;
