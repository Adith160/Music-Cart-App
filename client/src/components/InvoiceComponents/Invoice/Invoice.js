import React from "react";
import styles from "./Invoice.module.css";
import image1 from '../../../assets/Images/product1.png'

function Invoice() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.leftDiv}>
        <div className={styles.leftTopDiv}>
          <div className={styles.subDiv}>
            <span className={styles.title}>1. Delivery address</span>
            <div className={styles.valueDiv}>
              <span className={styles.name}>Akash Chopra</span>
              <p>
                Address Address Address Address Address Address Address Address
                Address Address Address Address
              </p>
            </div>
          </div>
          <div className={styles.subDiv2} style={{height:'10vh'}}>
            <span className={styles.title}>2. Payment method</span>
            <div className={styles.valueDiv}>
              <select defaultValue="Pay On Delivery">
                <option disabled>Mode of payment</option>
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
                        <img src={image1} alt="img"/>
                    </div>
                    <div className={styles.imageDiv}>
                        <img src={image1} alt="img"/>
                    </div>
                    <div className={styles.imageDiv}>
                        <img src={image1} alt="img"/>
                    </div>
                    <div className={styles.imageDiv}>
                        <img src={image1} alt="img"/>
                    </div>
                    <div className={styles.imageDiv}>
                        <img src={image1} alt="img"/>
                    </div>
                    <div className={styles.imageDiv}>
                        <img src={image1} alt="img"/>
                    </div>
                </div>
                <div className={styles.valueBottomDiv}>
                </div>
            </div>
          </div>
        </div>

        <div className={styles.leftBottomDiv}>
            <div className={styles.bottomDiv}>
            <button className={styles.viewInvoice}>Place your order</button>
            <div>
                <span>Order Total : ₹3545.00 </span>
                <span> By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
            </div>
            </div>
        </div>
      </div>
      <div className={styles.summaryDiv}>summaryDiv</div>
    </div>
  );
}

export default Invoice;
