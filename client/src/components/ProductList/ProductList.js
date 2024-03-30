import React from "react";
import styles from "./ProductList.module.css";
import buyIcon from '../../assets/Icons/BuyIcon.png';
import { useNavigate } from "react-router-dom";


function ProductList(props) {
  const navigate = useNavigate();
  const handleDetailClick=()=>{
    navigate('/product', {state:{product:props.product}})
  } 
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <img src={props.product.images1} alt="img" className={styles.image} style={{height:'29vh'}}/>
        <img src={buyIcon} alt="img" className={styles.buy}/>
      </div>

      <div className={styles.rightDiv}>
        <span style={{fontWeight:'800', fontSize:'1.5rem'}}>{props.product.name}  </span> <br />
        <span>Price -  &#8377; {props.product.price} </span> <br />
        <span>{props.product.color}  | {props.product.type} </span> <br />
        <span>{props.product.topFeatures} </span>
        <button onClick={handleDetailClick}>Details</button>
      </div>
    </div>
  );
}

export default ProductList;
