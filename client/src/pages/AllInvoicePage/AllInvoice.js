import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./AllInvoice.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";
import InvoiceContainer from "../../components/InvoiceContainer/InvoiceContainer";
import fileIcon from "../../assets/Icons/File2.png";

function AllInvoice() {
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

  const navigate = useNavigate();
  return (
    <>
      <Header />
      {!isMobile && (
        <>
          <div className={styles.topDiv}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
              Music Cart
              <span>Home / Invoices</span>
            </div>
            <span className={styles.viewCart}>
              <img src={cartIcon} alt="cart" />
              View Cart
            </span>
          </div>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/HomePage")}
          >
            Back to Home
          </button>
        </>
      )}
      <div className={styles.heading}>
        {" "}
        {isMobile && <img src={fileIcon} alt="file" />} My Invoices
      </div>

      <div className={styles.mainContainer}>
        <InvoiceContainer name={""} address={""} invId={""} />
        <InvoiceContainer name={""} address={""} invId={""} />
        <InvoiceContainer name={""} address={""} invId={""} />
        <InvoiceContainer name={""} address={""} invId={""} />
      </div>

      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default AllInvoice;
