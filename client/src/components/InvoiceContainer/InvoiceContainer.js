import React from "react";
import fileIcon from "../../assets/Icons/File.png";
import styles from "./InvoiceContainer.module.css";
import { useNavigate } from "react-router-dom";

function InvoiceContainer(props) {
    const navigate = useNavigate();
  return (
    <div className={styles.mainDiv}>
        <div className={styles.desc}>
        <img src={fileIcon} alt="file" /> 
      <p> InvoiceContainer <br/> 104 kk hh nagar, Lucknow 
Uttar Pradesh 226025</p> </div>
     
      <button className={styles.backBtn} onClick={()=>navigate('/HomePage')}>View Invoice</button>
    </div>
  );
}

export default InvoiceContainer;
