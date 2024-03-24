import React, { useEffect, useState } from "react";
import styles from "./Invoice.module.css";
import image1 from "../../../assets/Images/product1.png";

function Invoice(props) {
  const [ViewType, setViewType] = useState(props.view);
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
    <div className={styles.mainDiv}>
      <div className={styles.leftDiv}>
        <div className={styles.leftTopDiv}>
          <div className={styles.subDiv}>
            <span className={styles.title}>1. Delivery address</span>
            <div className={styles.valueDiv}>
              <span className={styles.name}>Akash Chopra</span>
              <p style={ViewType === "view" ? { border: "none" } : {}}>
                Address Address Address Address Address Address Address Address
                Address Address Address Address
              </p>
            </div>
          </div>
          <div className={styles.subDiv2} style={{ height: "10vh" }}>
            <span className={styles.title}>2. Payment method</span>
            <div className={styles.valueDiv}>
              <select disabled={ViewType === "view"}>
                <option disabled selected>
                  Mode of payment
                </option>
                <option>Pay On Delivery</option>
                <option>UPI</option>
                <option>Card</option>
              </select>
            </div>
          </div>
          <div className={styles.subDiv3}>
            <span className={styles.title}>3. Review items and delivery</span>
            <div className={styles.valueDiv}>
              <div className={styles.valueTopDiv}>
                <div className={styles.imageDiv}>
                  <img src={image1} alt="img" />
                </div>
                <div className={styles.imageDiv}>
                  <img src={image1} alt="img" />
                </div>
                <div className={styles.imageDiv}>
                  <img src={image1} alt="img" />
                </div>
                <div className={styles.imageDiv}>
                  <img src={image1} alt="img" />
                </div>
                <div className={styles.imageDiv}>
                  <img src={image1} alt="img" />
                </div>
                <div className={styles.imageDiv}>
                  <img src={image1} alt="img" />
                </div>
              </div>
              <div className={styles.valueBottomDiv}>
                <h3 style={{ color: "black", margin: "1%" }}>Sony Sony</h3>
                <span> Color: Black</span>
                <p>
                  Estimated delivery: <br />
                  Monday — FREE Standard Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {ViewType === "edit" ? (
          <div className={styles.leftBottomDiv}>
            <div className={styles.bottomDiv}>
              <button className={styles.viewInvoice}>Place your order</button>
              <div>
                <span style={{ color: "#B52B00", fontWeight: "500" }}>
                  Order Total : &#8377;3545.00{" "}
                </span>
                <br />
                <span style={{ fontSize: "0.7rem" }}>
                  {" "}
                  By placing your order, you agree to Musicart privacy notice
                  and conditions of use.
                </span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
  className={styles.summaryDiv}
  style={ViewType === "view" ? { height: "40%", padding: (isMobile && '15% 0') } : {}}
>
        <div className={styles.summary}>
          {ViewType === "edit" & !isMobile ? (
            <>
              <button className={styles.orderBtn}>Place your order</button>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </>
          ) : (
            ""
          )}
          <div
            className={styles.orderDiv}
            style={ViewType === "view" ? { borderTop: "none" } : {}}
          >
            <h3>Order Summary</h3>

            <span className={styles.spanStyle}>
              Items: <span style={{ width: "35%" }}>&#8377;35000.00</span>
            </span>
            <span className={styles.spanStyle}>
              Delivery: <span style={{ width: "35%" }}>&#8377;45.00</span>
            </span>
          </div>
          <span
            className={styles.spanStyle}
            style={{ color: "#B52B00", fontWeight: "500", width: "90%" }}
          >
            Order Total : <span style={{ width: "40%" }}>&#8377;35000.00</span>
          </span>
          {isMobile ? <button className={styles.orderBtn}>Place your order</button> : ''}
        </div>
      </div>
    </div>
  );
}

export default Invoice;
