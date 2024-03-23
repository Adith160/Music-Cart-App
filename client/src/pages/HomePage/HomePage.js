import React, { useEffect, useState } from "react";
import Home from "../../components/Homepage/MainPage/Home";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import "./HomePage.module.css";

function HomePage(props) {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { state } = location;
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
  const prop1 = state && state.prop1;
  console.log(prop1);
  return (
    <>
    {!isMobile && <Header />}
      <Home />
      {prop1}
      <Footer />
    </>
  );
}

export default HomePage;
