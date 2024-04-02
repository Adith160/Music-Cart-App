import React, { useEffect, useState } from "react";
import Register from "../../components/Register/Register";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./RegisterPage.module.css";

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
      <Register />
      <Footer />
    </>
  );
}

export default RegisterPage;
