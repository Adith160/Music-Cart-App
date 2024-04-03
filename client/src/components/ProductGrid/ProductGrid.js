import React, { useState, useEffect } from "react";
import styles from "./ProductGrid.module.css";
import buyIcon from "../../assets/Icons/BuyIcon.png";
import { useNavigate } from "react-router-dom";
import { addToMycart, getMyCart } from "../../api/invoices";

function ProductGrid(props) {
  const [IsLogin, setIsLogin] = useState(false);
  const [myCart, setMyCart] = useState(null);
  const product = props.product;

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("name"));
    myCart && props.setCartCount(myCart.invoice.products.length);
  }, [myCart, props]);
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
    if (isLogged) {
      try {
        let cartData = myCart;
        // Fetch cart data again if not already fetched
        if (!cartData & IsLogin) {
          cartData = await getMyCart();
          setMyCart(cartData);
        }
        // Calculate the total price of the product
        const total = product.price;
        if (!cartData || !cartData.invoice) {
          // Create a new cart if it doesn't exist
          const newCart = {
            discount: 0,
            delivery: 45,
            products: [
              {
                product_id: product._id,
                qty: 1,
                total: total,
              },
            ],
            placed: false,
            totQty: 1,
            grandtotal: total,
          };
          // Add the new cart to the backend
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
            cartData.invoice.totQty = cartData.invoice.totQty
              ? cartData.invoice.totQty + 1
              : 1;
          } else {
            existingProducts[existingProductIndex].qty += 1;
            existingProducts[existingProductIndex].total += total;
          }
          cartData.invoice.grandtotal = cartData.invoice.grandtotal
            ? Number(cartData.invoice.grandtotal)
            : 0 + total;
        }

        delete cartData.invoice._id;
        await addToMycart(cartData.invoice);
      } catch (error) {
        //
      }
    } else {
      navigate("/login");
    }
    myCart && props.setCartCount(myCart.invoice.products.length);
  };
  return (
    <div className={styles.mainDiv} onClick={handleDetailClick}>
      <div className={styles.imgDiv}>
        <img src={props.product.images1} alt="img" className={styles.image} />
        <img
          src={buyIcon}
          alt="img"
          className={styles.buy}
          onClick={handleAddToCartClick}
        />
      </div>
      <span>{props.product.name}</span> <br />
      <span>Price - &#8377; {props.product.price} </span> <br />
      <span>
        {props.product.color} | {props.product.type}{" "}
      </span>
    </div>
  );
}

export default ProductGrid;
