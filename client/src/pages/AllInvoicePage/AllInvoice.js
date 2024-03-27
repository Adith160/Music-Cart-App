import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./AllInvoice.module.css";
import MyInvoices from "../../components/InvoiceComponents/MyInvoices/MyInvoices";
import MyCart from "../../components/InvoiceComponents/MyCart/MyCart";
import Invoice from "../../components/InvoiceComponents/Invoice/Invoice";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";
import fileIcon from "../../assets/Icons/File2.png";
import bagIcom from '../../assets/Icons/Bag.png'
import backIcon from '../../assets/Icons/Back.png'
import { useLocation } from "react-router-dom";

function AllInvoice() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { state } = location;
  const page = state && state.page;
  //page = "MyCart";
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
            onClick={() =>
              navigate("/product", {
                state: { prop1: "value1", prop2: "value2" },
              })
            }
          >
            Back to products
          </button>
        </>
      )}
    
        {page === "MyInvoice" && (
          <>
          {isMobile &&  <div className={styles.backImg}> <img src={backIcon} alt="file" /> </div>}
           <div className={styles.heading}>
              {isMobile && <img src={fileIcon} alt="file" />} My Invoices
            </div>

            <div className={styles.mainContainer}>
              <MyInvoices />
            </div>
          </>
        )}

        {page === "MyCart" && (
          <>
          {isMobile &&  <div className={styles.backImg}> <img src={backIcon} alt="file" /> </div>}
            <div className={styles.heading}>
              <img src={bagIcom} alt="bag" className={styles.bagIcon}/> My Cart
            </div>

            <div className={styles.mainContainer}>
              <MyCart />
            </div>
          </>
        )}

        {page === "Invoice" && (
          <>
         {isMobile &&  <div className={styles.backImg}> <img src={backIcon} alt="file" /> </div>}
           
            <div className={styles.heading}>
             <u>Invoice</u>
            </div>

            <div className={styles.mainContainer} style={isMobile? {height:'90vh', overflowY:'scroll'}:{}}>
              <Invoice view={'view'}/>
            </div>
          </>
        )}

        {page === "Checkout" && (
          <>
           
          {isMobile &&  <div className={styles.backImg}> <img src={backIcon} alt="file" /> </div>}
          
          
          <div className={styles.heading}>
              <u>Checkout</u>
            </div>

            <div className={styles.mainContainer} style={isMobile? {height:'90vh', overflowY:'scroll'}:{}}>
              <Invoice view={'edit'}/>
            </div>
          </>
        )}

      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default AllInvoice;
