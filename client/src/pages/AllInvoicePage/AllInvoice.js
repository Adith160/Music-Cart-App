import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./AllInvoice.module.css";
import MyInvoices from "../../components/InvoiceComponents/MyInvoices/MyInvoices";
import MyCart from "../../components/InvoiceComponents/MyCart/MyCart";
import Invoice from "../../components/InvoiceComponents/Invoice/Invoice";
import InvoiceView from "../../components/InvoiceComponents/Invoice/InvoiceView";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";
import fileIcon from "../../assets/Icons/File2.png";
import bagIcom from "../../assets/Icons/Bag.png";
import backIcon from "../../assets/Icons/Back.png";
import { useLocation } from "react-router-dom";

function AllInvoice() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { state } = location;
  const page = state && state.page;
  const invId = state && state.invId;
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
              <span>
                Home /
                {page === "Checkout"
                  ? "Checkout"
                  : page === "MyCart"
                  ? "View Cart"
                  : "Invoices"}
              </span>
            </div>
            {(page === "MyInvoice") | (page === "MyCart") ? (
              <span
                className={styles.viewCart}
                onClick={() =>
                  navigate("/AllInvoice", { state: { page: "MyCart" } })
                }
              >
                <img src={cartIcon} alt="cart" />
                View Cart
              </span>
            ) : (
              ""
            )}
          </div>

          {page === "Checkout" ? (
            <button
              className={styles.backBtn}
              onClick={() =>
                navigate("/allinvoice", {
                  state: { page: "MyCart" },
                })
              }
            >
              Back to cart
            </button>
          ) : (
            <button
              className={styles.backBtn}
              onClick={() =>
                page === "Invoice"
                  ? navigate("/allInvoice", { state: { page: "MyInvoice" } })
                  : navigate("/homepage")
              }
            >
              Back to{" "}
              {page === "MyCart"
                ? "products"
                : page === "MyInvoice"
                ? "Home"
                : "cart"}
            </button>
          )}
        </>
      )}

      {page === "MyInvoice" && (
        <>
          {isMobile && (
            <div className={styles.backImg}>
              {" "}
              <img src={backIcon} alt="file" />{" "}
            </div>
          )}
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
          {isMobile ? (
            <div
              className={styles.backImg}
              onClick={() => navigate("/homepage")}
            >
              {" "}
              <img src={backIcon} alt="file" />{" "}
            </div>
          ) : (
            <div className={styles.heading}>
              <img src={bagIcom} alt="bag" className={styles.bagIcon} /> My Cart
            </div>
          )}
          <div className={styles.mainContainer}>
            <MyCart />
          </div>
        </>
      )}

      {page === "Invoice" && (
        <>
          {isMobile && (
            <div
              className={styles.backImg}
              onClick={() =>
                navigate("/AllInvoice", { state: { page: "MyInvoice" } })
              }
            >
              {" "}
              <img src={backIcon} alt="file" />{" "}
            </div>
          )}

          <div className={styles.heading}>
            <u>Invoice</u>
          </div>

          <div
            className={styles.mainContainer}
            style={isMobile ? { height: "90vh", overflowY: "scroll" } : {}}
          >
            <InvoiceView invId={invId} />
          </div>
        </>
      )}

      {page === "Checkout" && (
        <>
          {isMobile && (
            <div
              className={styles.backImg}
              onClick={() =>
                navigate("/AllInvoice", { state: { page: "MyCart" } })
              }
            >
              {" "}
              <img src={backIcon} alt="file" />{" "}
            </div>
          )}

          <div className={styles.heading}>
            <u>Checkout</u>
          </div>

          <div
            className={styles.mainContainer}
            style={isMobile ? { height: "90vh", overflowY: "scroll" } : {}}
          >
            <Invoice view={"edit"} />
          </div>
        </>
      )}

      {!isMobile ? (
        <Footer />
      ) : page === "MyCart" ? (
        <FooterMenu selected={2} />
      ) : (
        <FooterMenu selected={1} />
      )}
    </>
  );
}

export default AllInvoice;
