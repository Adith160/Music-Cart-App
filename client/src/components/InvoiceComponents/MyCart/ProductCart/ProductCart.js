import React, { useState, useEffect } from 'react';
import styles from './ProductCart.module.css';
import { getProductById } from '../../../../api/product';

function ProductCart({ product, onQuantityChange }) {
  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await getProductById(product.product_id);
        setProductData(result);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [product.product_id]);

  useEffect(() => {
    setQuantity(product.qty);
  }, [product.qty]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    onQuantityChange(product.product_id, newQuantity);
  };

  return (
    <div className={styles.productsDiv}>
      <div className={styles.productDiv}>
        <div className={styles.imageDiv}>
          <img src={productData.images1} alt="Product" />
        </div>
        <div className={styles.productDesc}>
          <span className={styles.title} style={{ fontWeight: '800' }}>
            {productData.name}
          </span>
          <br />
          <span className={styles.value}>Color: {productData.color}</span>
          <br />
          <span className={styles.value}>In Stock</span>
        </div>
        <div className={styles.priceDiv}>
          <span className={styles.title}>Price</span>
          <br />
          <span className={styles.title}>&#8377; {productData.price}</span>
        </div>
        <div className={styles.qtyDiv}>
          <span className={styles.title}>Quantity</span>
          <br />
          <select value={quantity} onChange={handleQuantityChange}>
            {[...Array(8).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.totDiv}>
          <span className={styles.title}>Total</span>
          <br />
          <span className={styles.title}>
            &#8377; {productData.price * quantity}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
