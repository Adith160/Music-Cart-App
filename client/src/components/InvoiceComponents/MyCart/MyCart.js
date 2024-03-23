import React from "react";
import styles from "./MyCart.module.css";
import Products from "./ProductCart/ProductCart";
import { useNavigate } from "react-router-dom";

function MyCart() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainDiv}>
      
      <div className={styles.leftDiv}>
        <div className={styles.leftTop}>
          <Products />
          <Products />
          <Products />
        </div>
        <div className={styles.leftDown}>
          <span>1 Item</span>
          <span>&#8377;3500</span>
        </div>
      </div>

      <div className={styles.summaryDiv}>
        <div className={styles.summary}>
          <h4>PRICE DETAILS</h4>
          <span className={styles.amount}>Total MRP <span>&#8377;10</span></span>
          <span className={styles.amount}>Discount on MRP <span>&#8377;10</span></span>
          <span className={styles.amount}>Convenience Fee <span>&#8377;10</span></span>
          <div className={styles.total}>
            <span className={styles.amount}>Total Amount <span>&#8377;10</span></span>
            <br />
            <button
              className={styles.viewInvoice}
              onClick={() => navigate("/HomePage")}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
