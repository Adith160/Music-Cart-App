import React, { useEffect, useState } from "react";
import Home from "../../components/Homepage/MainPage/Home";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./HomePage.module.css";

function HomePage() {
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
  return (
    <>
    {!isMobile && <Header />}
      <Home />
      <Footer />
    </>
  );
}

export default HomePage;
