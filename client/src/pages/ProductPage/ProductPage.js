import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./ProductPage.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";
import image from "../../assets/Images/product1.png";
import starIcon from '../../assets/Icons/Star.png'

function ProductPage() {
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
              <span>Home / Invoices</span>
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
        Sony WH-CH720N, Wireless Over-Ear Active Noise Cancellation Headphones
        with Mic, up to 50 Hours Playtime, Multi-Point Connection, App Support,
        AUX & Voice Assistant Support for Mobile Phones (Black)
      </div>

      <div className={styles.mainContainer}>

        <div className={styles.leftContainer}>
          <div className={styles.leftTopDiv}>
            <img src={image} alt="img" />
          </div>
          <div className={styles.leftBottomDiv}>
            <img src={image} alt="img" />
            <img src={image} alt="img" />
            <img src={image} alt="img" />
          </div>
        </div>

        <div className={styles.rightContainer}>
       <h2>Sony WH-CH720N</h2>
       <div className={styles.reviews}>
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/> 
        <img src={starIcon} alt="stars"/>
        (50 Customer reviews)
        </div>
       <span style={{fontWeight:'600'}}>Price - ₹ 3,500</span>
       <span>Black | Over-ear headphone</span>
       <p>About this item <br/>
Sony’s lightest Wireless Noise-cancelling headband
       ever
Up to 50-hour battery life with quick charging (3 min
      charge for up to 1 hour of playback)
Multi-Point Connection helps to pair with two
      Bluetooth devices at the same time
Take noise cancelling to the next level with Sony’s
      Integrated Processor V1,so you can fully immerse
      yourself in the music
Super comfortable and lightweight design
      ( 192 Grams )
High sound quality and well-balanced sound tuning</p>
       <span> <span style={{fontWeight:'600'}}>Available</span>  - In stock</span>
       <span><span style={{fontWeight:'600'}}>Brand</span> - Sony</span>
       <button>Add to cart</button>
       <button style={{backgroundColor:'#FFB800'}}>Buy Now</button>
       </div>
      </div>

      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default ProductPage;
