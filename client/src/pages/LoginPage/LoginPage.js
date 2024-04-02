import React, { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./LoginPage.module.css";

function RegisterPage() {
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
      {isMobile && <Header />}
      <Login />
      <Footer />
    </>
  );
}

export default RegisterPage;
