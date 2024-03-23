import React from 'react'
import styles from './ProductCart.module.css'
import image1 from '../../../../assets/Images/product1.png'

function ProductCart() {
  return (
    <div className={styles.productsDiv}>
            <div className={styles.productDiv}>
                <div className={styles.imageDiv}>
                    <img src={image1} alt="img"/>
                </div>
                <div className={styles.productDesc}>
                    <span className={styles.title} style={{fontWeight:'800'}}>Name</span><br/>
                    <span className={styles.value}>Color :</span><br/>
                    <span className={styles.value}>In Stock</span>
                </div>
                <div className={styles.priceDiv}>
                    <span className={styles.title}>Price</span><br/>
                    <span className={styles.title}> &#8377; 300</span>
                </div>
                <div className={styles.qtyDiv}>
                    <span className={styles.title}>Quantity</span><br/>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                    </select>
                </div>
                <div className={styles.totDiv}>
                    <span className={styles.title}>Total</span><br/>
                    <span className={styles.title}> &#8377; 300</span>
                 </div>
            </div>
        </div>

  )
}

export default ProductCart