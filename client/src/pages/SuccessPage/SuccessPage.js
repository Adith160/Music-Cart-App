import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./SuccessPage.module.css";
import success from "../../assets/Images/success.png";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
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
      {isMobile ? (
        <Header />
      ) : (
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          Music Cart
        </div>
      )}
      <div className={styles.mainDiv}>
        <div className={styles.mainContainer}>
          <img src={success} alt="success" />
          <div className={styles.text}>
            <h3>Order is placed successfully!</h3>
            <span>
              You will be receiving a confirmation email with order details
            </span>
          </div>

          <button className={styles.btn} onClick={() => navigate("/HomePage")}>
            Go back to Home page
          </button>
          <button
            className={styles.btn}
            onClick={() =>
              navigate("/allInvoice", { state: { page: "MyInvoice" } })
            }
            style={{ backgroundColor: "green" }}
          >
            Go To MyInvoices
          </button>
        </div>
      </div>
      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default SuccessPage;
