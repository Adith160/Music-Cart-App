import React from "react";
import fileIcon from "../../../../assets/Icons/File.png";
import styles from "./InvoiceContainer.module.css";
import { useNavigate } from "react-router-dom";

function InvoiceContainer(props) {
  const { name, address, invId } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.mainDiv}>
      <div className={styles.desc}>
        <img src={fileIcon} alt="file" />
        <p>
          {name} <br /> {address}
        </p>
      </div>
      <button
        className={styles.viewInvoice}
        onClick={() =>
          navigate(`/allInvoice`, { state: { page: "Invoice", invId: invId } })
        }
      >
        View Invoice
      </button>
    </div>
  );
}

export default InvoiceContainer;
