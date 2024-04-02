import React, { useEffect, useState } from "react";
import styles from "./Invoice.module.css";
import { getInvoiceById } from "../../../api/invoices";
import { getAllProducts } from "../../../api/product";
import { toast } from "react-toastify";

function Invoice(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [cartData, setCartData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState({});
  const invId = props.invId;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoice = await getInvoiceById(invId);
        setInvoiceData(invoice);
        setAddress(invoice.address);
        setPaymentType(invoice.paymentType);
        setCartData(invoice.products);
        if (invoice.products.length > 0) {
          const products = await getAllProducts();
          const productsMap = {};
          products.forEach((product) => {
            productsMap[product._id] = product;
          });
          setProductsData(productsMap);
          setSelectedProduct(productsMap[invoice.products[0].product_id]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [invId]);

  const handleProductClick = (productId) => {
    setSelectedProduct(productsData[productId]);
  };
  console.log(address);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.leftDiv}>
        <div className={styles.leftTopDiv}>
          <div className={styles.subDiv}>
            <span className={styles.title}>1. Delivery address</span>
            <div className={styles.valueDiv}>
              <span className={styles.name}>
                {localStorage.getItem("name")}
              </span>
              <textarea
                value={address}
                style={{
                  height: "45%",
                  border: "none",
                  color: "#797979",
                  fontSize: "1rem",
                  cursor: "default",
                  marginTop: "4%",
                }}
              />
            </div>
          </div>
          <div className={styles.subDiv2} style={{ height: "10vh" }}>
            <span className={styles.title}>2. Payment method</span>
            <div className={styles.valueDiv}>
              <span
                style={{
                  border: "1px solid #cfcdcd",
                  height: "3.4vh",
                  fontSize: "0.9rem",
                  padding: "1% 0 0 5%",
                }}
              >
                {paymentType}
              </span>
            </div>
          </div>
          <div className={styles.subDiv3}>
            <span className={styles.title}>3. Review items and delivery</span>
            <div className={styles.valueDiv}>
              <div className={styles.valueTopDiv}>
                {cartData.map((product) => (
                  <div
                    style={{ marginLeft: "-5%" }}
                    className={styles.imageDiv}
                    key={product.product_id}
                    onClick={() => handleProductClick(product.product_id)}
                  >
                    <img
                      src={productsData[product.product_id]?.images1 || ""}
                      alt="img"
                    />
                  </div>
                ))}
              </div>
              <div
                className={styles.valueBottomDiv}
                style={{ marginLeft: "-6%" }}
              >
                {selectedProduct && (
                  <>
                    <h3 style={{ color: "black", margin: "1%" }}>
                      {selectedProduct.name}
                    </h3>
                    <span> Color: {selectedProduct.color}</span>
                  </>
                )}
                <span style={{ color: "black" }}>
                  <br />
                  Delivery : Monday — FREE Standard Delivery <br /> Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.summaryDiv}
        style={{ height: "40%", padding: isMobile && "15% 0" }}
      >
        <div className={styles.summary}>
          <div className={styles.orderDiv}>
            <h3>Order Summary</h3>
            <span className={styles.spanStyle}>
              Items:{" "}
              <span style={{ width: "35%" }}>
                &#8377;{invoiceData.grandtotal - invoiceData.delivery}
              </span>
            </span>
            <span className={styles.spanStyle}>
              Delivery:{" "}
              <span style={{ width: "35%" }}>
                &#8377;{invoiceData.delivery}
              </span>
            </span>
          </div>
          <span
            className={styles.spanStyle}
            style={{ color: "#B52B00", fontWeight: "500", width: "90%" }}
          >
            Order Total :{" "}
            <span style={{ width: "40%" }}>
              &#8377;{invoiceData.grandtotal}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
