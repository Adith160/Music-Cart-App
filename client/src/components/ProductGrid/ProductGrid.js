import React from 'react'
import styles from './ProductGrid.module.css'
import buyIcon from '../../assets/Icons/BuyIcon.png'
import { useNavigate } from "react-router-dom";

function ProductGrid(props) {
  const navigate = useNavigate();
  const handleDetailClick=()=>{
    navigate('/product', {state:{product:props.product}})
  } 
  return (
    <div className={styles.mainDiv}>
       <div className={styles.imgDiv}>
      <img src={props.product.images1} alt='img' className={styles.image}/>
       <img src={buyIcon} alt="img" className={styles.buy} onClick={handleDetailClick}/>
    </div>
     
    <span>{props.product.name}</span> <br/>
    <span>Price -  &#8377; {props.product.price} </span> <br/>
    <span>{props.product.color} | {props.product.type} </span>
    </div>
  )
}

export default ProductGrid