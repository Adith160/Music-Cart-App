import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import buyIcon from "../../assets/Icons/BuyIcon.png";
import { useNavigate } from "react-router-dom";
import { addToMycart, getMyCart } from "../../api/invoices";

function ProductList(props) {
  const [IsLogin, setIsLogin] = useState(false);
  const [myCart, setMyCart] = useState(null);
  const product = props.product;

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("name"));
  }, []);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (IsLogin) {
          const cartData = await getMyCart();
          setMyCart(cartData);
        }
      } catch (error) {
        //
      }
    };

    fetchCart();
  }, [IsLogin]);
  const navigate = useNavigate();
  const handleDetailClick = () => {
    navigate("/product", { state: { product: props.product } });
  };

  const handleAddToCartClick = async (e) => {
    e.stopPropagation();
    const isLogged = !!localStorage.getItem("name");
    
    if (!isLogged) {
      navigate("/login");
      return;
    }
  
    try {
      let cartData = myCart;
  
      // Fetch cart data again if not already fetched
      if (!cartData) {
        cartData = await getMyCart();
        setMyCart(cartData);
      }
  
      const total = product.price;
  
      if (!cartData || !cartData.invoice) {
        // Create a new cart if it doesn't exist
        const newCart = {
          discount: 0,
          delivery: 45,
          products: [{
            product_id: product._id,
            qty: 1,
            total: total,
          }],
          placed: false,
          totQty: 1,
          grandtotal: total,
        };
  
        await addToMycart(newCart);
      } else {
        // Update existing cart with the selected product
        const existingProducts = cartData.invoice.products;
        const existingProductIndex = existingProducts.findIndex(
          (item) => item.product_id === product._id
        );
  
        if (existingProductIndex === -1) {
          existingProducts.push({
            product_id: product._id,
            qty: 1,
            total: total,
          });
          cartData.invoice.totQty += 1;
        } else {
          existingProducts[existingProductIndex].qty += 1;
          existingProducts[existingProductIndex].total += total;
        }
  
        cartData.invoice.grandtotal = (cartData.invoice.grandtotal ? Number(cartData.invoice.grandtotal) : 0) + total;
  
        delete cartData.invoice._id;
        await addToMycart(cartData.invoice);
      }
    } catch (error) {
      // Handle errors
      console.error("Error adding item to cart:", error);
      // Optionally provide feedback to the user
    }
  
    // Update cart count in parent component
    myCart && props.setCartCount(myCart.invoice.products.length);
  };
  
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <img
          src={props.product.images1}
          alt="img"
          className={styles.image}
          style={{ height: "29vh" }}
        />
        <img
          src={buyIcon}
          alt="img"
          className={styles.buy}
          onClick={handleAddToCartClick}
        />
      </div>

      <div className={styles.rightDiv}>
        <span style={{ fontWeight: "800", fontSize: "1.5rem" }}>
          {props.product.name}{" "}
        </span>{" "}
        <br />
        <span>Price - &#8377; {props.product.price} </span> <br />
        <span>
          {props.product.color} | {props.product.type}{" "}
        </span>{" "}
        <br />
        <span>{props.product.topFeatures} </span>
        <button onClick={handleDetailClick}>Details</button>
      </div>
    </div>
  );
}

export default ProductList;
