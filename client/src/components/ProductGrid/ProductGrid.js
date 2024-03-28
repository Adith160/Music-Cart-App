import React from 'react'
import styles from './ProductGrid.module.css'
import buyIcon from '../../assets/Icons/BuyIcon.png'

function ProductGrid(props) {
  console.log(props.image);
  return (
    <div className={styles.mainDiv}>
       <div className={styles.imgDiv}>
      <img src={props.image} alt='img' className={styles.image}/>
       <img src={buyIcon} alt="img" className={styles.buy}/>
    </div>
     
    <span>{props.name}</span> <br/>
    <span>Price -  &#8377; {props.price} </span> <br/>
    <span>{props.color} | {props.type} </span>
    </div>
  )
}

export default ProductGrid