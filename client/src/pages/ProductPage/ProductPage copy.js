import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./ProductPage.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";
import starIcon from '../../assets/Icons/Star.png'
import { useLocation } from "react-router-dom";
import { addToMycart, getMyCart } from "../../api/invoices";

function ProductPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [myCart, setMyCart] = useState(null);
  const location = useLocation();
  const { state } = location;
  const product = state && state.product;

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

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getMyCart();
        setMyCart(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const navigate = useNavigate();

  const handleBuyClick = async () => {
    const isLogged = !!localStorage.getItem('name');
  
    if (isLogged) {
      try {
        let cartData = myCart;
  
        // Fetch cart data again if not already fetched
        if (!cartData) {
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
            products: [{
              product_id: product._id, // Add product_id
              qty: 1,
              total: total
            }],
            placed: false,
            totQty: 1, // Initialize totQty as 1
            grandtotal: total // Initialize grandtotal
          };
          // Add the new cart to the backend
          await addToMycart(newCart);
        } else {
          // Update existing cart with the selected product
          const existingProducts = cartData.invoice.products;
          const existingProductIndex = existingProducts.findIndex(item => item.product_id === product._id);
  
          if (existingProductIndex === -1) {
            // Selected product not in the cart, add it
            existingProducts.push({
              product_id: product._id, // Add product_id
              qty: 1,
              total: total
            });
            // Initialize totQty as 1 if it's not already set
            cartData.invoice.totQty = cartData.invoice.totQty ? cartData.invoice.totQty + 1 : 1;
          }
           else {
            // Selected product already in the cart, update its quantity
            existingProducts[existingProductIndex].qty += 1;
            existingProducts[existingProductIndex].total += total;
          }
          debugger;
          // Update cart totals   
          cartData.invoice.grandtotal = cartData.invoice.grandtotal ? Number(cartData.invoice.grandtotal) : 0+ total;
        }
  
        // Remove the _id field from MyCart object
        delete cartData.invoice._id;
  
        // Update the cart in the backend
        await addToMycart(cartData.invoice);
  
        // Navigate to cart page after updating the cart
        navigate('/allinvoice', { state: { product: product, page: 'MyCart' } });
      } catch (error) {
        console.error("Error handling buy click:", error);
      }
    } else {
      navigate('/login');
    }
  };
  
  
  
  
  
  

  
  return (
    <>
      <Header />
      {!isMobile && (
        <>
          <div className={styles.topDiv}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
              Music Cart
              <span>Home / {product.name}</span>
            </div>
            <span className={styles.viewCart}>
              <img src={cartIcon} alt="cart" />
              View Cart
            </span>
          </div>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/HomePage")}
          >
            Back to products
          </button>
        </>
      )}
      <div className={styles.heading}>
        {product.topFeatures}
      </div>

      <div className={styles.mainContainer}>

        <div className={styles.leftContainer}>
          <div className={styles.leftTopDiv}>
            <img src={product.images1} alt="img" />
          </div>
          <div className={styles.leftBottomDiv}>
            <img src={product.images2} alt="img" />
            <img src={product.images3} alt="img" />
            <img src={product.images4} alt="img" />
          </div>
        </div>

        <div className={styles.rightContainer}>
       <h2>{product.name}</h2>
       <div className={styles.reviews}>
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/>
        (50 Customer reviews)
        </div>
       <span style={{fontWeight:'600', fontSize:'1rem'}}>Price - ₹ {product.price}</span>
       <span>{product.color} | {product.type}</span>
       <p>About this item <br/>
       {product.about}</p>
       <span> <span style={{fontWeight:'600'}}>Available</span>  - In stock</span>
       <span><span style={{fontWeight:'600'}}>Brand</span> - {product.brand}</span>
       <button onClick={handleBuyClick}>Add to cart</button>
       <button style={{backgroundColor:'#FFB800'}} onClick={handleBuyClick}>Buy Now</button>
       </div>
      </div>

      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default ProductPage;
