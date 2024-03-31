import React, { useState, useEffect } from "react";
import styles from "./MyCart.module.css";
import Products from "./ProductCart/ProductCart";
import { useNavigate } from "react-router-dom";
import { getMyCart } from "../../../api/invoices";

function MyCart() {
  const [cartData, setCartData] = useState([]);
  const [fullData, setFullData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const invoice = await getMyCart();
        setCartData(invoice.invoice.products);
        setFullData(invoice.invoice);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartData();
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    const updatedCartData = cartData.map((product) =>
      product.product_id === productId ? { ...product, qty: quantity } : product
    );
    setCartData(updatedCartData);
  };

  const calculateTotalPrice = () => {
    return cartData.reduce((total, product) => total + product.total, 0);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.leftDiv}>
        <div className={styles.leftTop}>
          {cartData.map((product) => (
            <Products
              key={product.product_id}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className={styles.leftDown}>
          <span>{cartData.length} Items</span>
          <span>&#8377; {calculateTotalPrice()}</span>
        </div>
      </div>
      <div className={styles.summaryDiv}>
        <div className={styles.summary}>
          <h4>PRICE DETAILS</h4>
          <span className={styles.amount}>
            Total MRP <span>&#8377; {fullData.grandtotal}</span>
          </span>
          <span className={styles.amount}>
            Discount on MRP <span>&#8377; {fullData.discount}</span>
          </span>
          <span className={styles.amount}>
            Convenience Fee <span>&#8377; {fullData.delivery}</span>
          </span>
          <div className={styles.total}>
            <span className={styles.amount}>
              Total Amount <span>&#8377; {fullData.grandtotal}</span>
            </span>
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
