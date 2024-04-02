import React, { useState, useEffect } from "react";
import styles from "./MyCart.module.css";
import Products from "./ProductCart/ProductCart";
import { useNavigate } from "react-router-dom";
import { getMyCart, addToMycart } from "../../../api/invoices";

function MyCart() {
  const [cartData, setCartData] = useState([]);
  const [fullData, setFullData] = useState({});
  const [isMobile, setIsMobile] = useState(false);
 
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

  const handleQuantityChange = (productId, quantity, price) => {
    const updatedCartData = cartData.map((product) => {
      if (product.product_id === productId) {
        const totalPrice = price * quantity;
        return { ...product, qty: quantity, total: totalPrice };
      }
      return product;
    });
    setCartData(updatedCartData);
  };

  const handlePlaceOrder = async () => {
    try {
      // Calculate total quantity and grand total
      const totQty = cartData.reduce((total, product) => total + product.qty, 0);
      const grandtotal = cartData.reduce((total, product) => total + product.total, 0) + fullData.delivery;

      // Prepare the updated invoice data
      const updatedInvoice = {
        ...fullData,
        products: cartData,
        totQty,
        grandtotal,
        placed: false
      };

      // Update the invoice in the backend
      await addToMycart(updatedInvoice);

      // Navigate to the homepage after placing the order
      navigate("/allinvoice", {state:{page:"Checkout"}});
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartData.reduce((total, product) => total + product.total, 0);
  };

  return (
    <div className={styles.mainDiv}>
      {!isMobile? (<>
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
            Total MRP <span>&#8377; {calculateTotalPrice()}</span>
          </span>
          <span className={styles.amount}>
            Discount on MRP <span>&#8377; {fullData.discount}</span>
          </span>
          <span className={styles.amount}>
            Convenience Fee <span>&#8377; {fullData.delivery}</span>
          </span>
          <div className={styles.total}>
            <span className={styles.amount}>
              Total Amount <span>&#8377; {calculateTotalPrice() + fullData.delivery}</span>
            </span>
            <br />
            <button
              className={styles.viewInvoice}
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      </>) : (<div>
        <div className={styles.mobileDiv}>
          {cartData.map((product) => (
            <Products
              key={product.product_id}
              product={product}
              onQuantityChange={handleQuantityChange}
              isMobile={isMobile}
            />
          ))}
        </div>
        <div className={styles.total}>
            <span className={styles.amount}>
              Total Amount <span>&#8377; {calculateTotalPrice() + fullData.delivery}</span>
            </span>
            <br />
            <button
              className={styles.viewInvoice}
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>
          </div>
      </div>)}
     
    </div>
  );
}

export default MyCart;
