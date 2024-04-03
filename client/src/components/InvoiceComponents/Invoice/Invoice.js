import React, { useEffect, useState } from "react";
import styles from "./Invoice.module.css";
import { getAllProducts } from "../../../api/product";
import { createInvoice, getMyCart } from "../../../api/invoices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Invoice() {
  const [isMobile, setIsMobile] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [cartData, setCartData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState({});

  const navigate = useNavigate();
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
    const fetchCartData = async () => {
      try {
        const response = await getMyCart();
        setCartData(response.invoice.products);
        setInvoiceData(response.invoice);
        if (response.invoice.products.length > 0) {
          setSelectedProduct(
            productsData[response.invoice.products[0].product_id]
          );
        }
      } catch (error) {
        //
      }
    };
    fetchCartData();
  }, [productsData]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const products = await getAllProducts();
        const productsMap = {};
        products.forEach((product) => {
          productsMap[product._id] = product;
        });
        setProductsData(productsMap);
      } catch (error) {
        //
      }
    };
    fetchProductsData();
  }, []);

  const handlePlaceOrder = async () => {
    if (!address || !paymentType) {
      toast.error("Address & Payment Method Required!");
      return;
    }

    try {
      const request = {
        address,
        paymentType,
        products: cartData.map((product) => ({
          product_id: product.product_id,
          qty: product.qty,
          total: product.total,
        })),
        placed: true,
      };

      const response = await createInvoice(request);
      if (response) navigate("/success");
      else toast.error("Something went wrong");
    } catch (error) {
      toast.error("Error placing order:", error);
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProduct(productsData[productId]);
  };
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
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                style={!isMobile ?{height:'10vh'}:{}}
              />
            </div>
          </div>
          <div className={styles.subDiv2} style={{ height: "10vh" }}>
            <span className={styles.title}>2. Payment method</span>
            <div className={styles.valueDiv}>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option disabled value="">
                  Mode of payment
                </option>
                <option>Pay On Delivery</option>
                <option>UPI</option>
                <option>Card</option>
              </select>
            </div>
          </div>
          <div className={styles.subDiv3}>
            <span className={styles.title}>3. Review items and delivery</span>
            <div className={styles.valueDiv}>
              <div className={styles.valueTopDiv}>
                {cartData.map((product) => (
                  <div
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
              <div className={styles.valueBottomDiv}>
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
                  Estimated delivery :<br />
                  Monday — FREE Standard Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.leftBottomDiv}>
          <div className={styles.bottomDiv}>
            <button className={styles.viewInvoice} onClick={handlePlaceOrder}>
              Place your order
            </button>
            <div>
              <span style={{ color: "#B52B00", fontWeight: "500" }}>
                Order Total : &#8377;{invoiceData.grandtotal}{" "}
              </span>
              <br />
              <span style={{ fontSize: "0.7rem" }}>
                {" "}
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.summaryDiv}
        style={
          isMobile & cartData.length > 4 ? { marginTop: "60%" } : {}
        }
      >
        <div className={styles.summary}>
          {!isMobile ? (
            <>
              <button className={styles.orderBtn} onClick={handlePlaceOrder}>
                Place your order
              </button>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
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
            </>
          ) : (
            <>
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
              <button className={styles.orderBtn} onClick={handlePlaceOrder}>
                Place your order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Invoice;
