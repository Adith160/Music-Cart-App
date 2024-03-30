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

  const navigate = useNavigate();

  const handleBuyClick=()=>{
    const isLogged = !!localStorage.getItem('name');
    
    if(isLogged){
      navigate('/allinvoice', {state:{product:product, page:'MyCart'}})
    }else{
      navigate('/login');
    }
  } 
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
