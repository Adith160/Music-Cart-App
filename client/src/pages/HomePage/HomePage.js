import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [ShowDP, setShowDP] = useState(false);

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

  const handleShowDpClick=()=>{
    setShowDP(!ShowDP);
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
              <span>Home / Invoices</span>
            </div>
            <div className={styles.profileDiv}>
            <span className={styles.viewCart}>
              <img src={cartIcon} alt="cart" />
              View Cart
            </span>
            <div className={styles.dpDiv} onClick={()=>handleShowDpClick()}>
              AK
              {ShowDP && 
               <div className={styles.dropdown}>
               <span onClick={(e)=> e.stopPropagation()}>Nameuu biaciciiaci</span><br/>
               <span>Logout</span>
             </div>}
           
            </div>
            </div>
           
          </div>
        </>
      )}
     
      <div className={styles.mainContainer}>
      division
      </div>

      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default HomePage;
