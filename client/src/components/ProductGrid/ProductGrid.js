import React from 'react'
import styles from './ProductGrid.module.css'
import image1 from '../../assets/Images/product1.png'
import buyIcon from '../../assets/Icons/BuyIcon.png'

function ProductGrid() {
  return (
    <div className={styles.mainDiv}>
       <div className={styles.imgDiv}>
      <img src={image1} alt='img' className={styles.image}/>
       <img src={buyIcon} alt="img" className={styles.buy}/>
    </div>
     
    <span>boAt Rockerz 551ANC </span> <br/>
    <span>Price -  &#8377; 3,000 </span> <br/>
    <span>Blue | On-ear headphone </span>
    </div>
  )
}

export default ProductGrid