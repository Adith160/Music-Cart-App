import React from "react";
import styles from "./ProductList.module.css";
import image1 from "../../assets/Images/product1.png";
import buyIcon from '../../assets/Icons/BuyIcon.png';

function ProductList() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <img src={image1} alt="img" className={styles.image} />
        <img src={buyIcon} alt="img" className={styles.buy}/>
      </div>

      <div className={styles.rightDiv}>
        <span style={{fontWeight:'800', fontSize:'1rem'}}>boAt Rockerz 551ANC </span> <br />
        <span>Price -  &#8377; 3,000 </span> <br />
        <span>Blue | On-ear headphone</span> <br />
        <span>boAt Rockerz 551 ANC with Hybrid ANC, 100 HRS Playback, 40mm Drivers & ASAP Charge
Bluetooth Headset (Stellar Black, On the Ear) </span>
      </div>
    </div>
  );
}

export default ProductList;
