import React from "react";
import styles from "./ProductList.module.css";
import buyIcon from '../../assets/Icons/BuyIcon.png';

function ProductList(props) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <img src={props.image} alt="img" className={styles.image} />
        <img src={buyIcon} alt="img" className={styles.buy}/>
      </div>

      <div className={styles.rightDiv}>
        <span style={{fontWeight:'800', fontSize:'1rem'}}>{props.name}  </span> <br />
        <span>Price -  &#8377; {props.price} </span> <br />
        <span>{props.color}  | {props.type} </span> <br />
        <span>{props.desc} </span>
      </div>
    </div>
  );
}

export default ProductList;
