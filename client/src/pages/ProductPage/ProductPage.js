import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import styles from "./ProductPage.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";
import starIcon from "../../assets/Icons/Star.png";
import { useLocation } from "react-router-dom";
import { addToMycart, getMyCart } from "../../api/invoices";
import backIcon from "../../assets/Icons/Back.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const [myCart, setMyCart] = useState(null);
  const location = useLocation();
  const { state } = location;
  const product = state && state.product;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    setIsLogin(!!localStorage.getItem("name"));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (IsLogin) {
          const cartData = await getMyCart();
          setMyCart(cartData);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [IsLogin]);

  const navigate = useNavigate();

  const handleBuyClick = async () => {
    const isLogged = !!localStorage.getItem("name");
    if (isLogged) {
      try {
        let cartData = myCart;
        // Fetch cart data again if not already fetched
        if (!cartData & IsLogin) {
          cartData = await getMyCart();
          setMyCart(cartData);
        }
        // Calculate the total price of the product
        const total = product.price;
        if (!cartData || !cartData.invoice) {
          // Create a new cart if it doesn't exist
          const newCart = {
            discount: 0,
            delivery: 45,
            products: [
              {
                product_id: product._id,
                qty: 1,
                total: total,
              },
            ],
            placed: false,
            totQty: 1,
            grandtotal: total,
          };
          // Add the new cart to the backend
          await addToMycart(newCart);
          navigate("/allinvoice", {
            state: { product: product, page: "MyCart" },
          });
        } else {
          // Update existing cart with the selected product
          const existingProducts = cartData.invoice.products;
          const existingProductIndex = existingProducts.findIndex(
            (item) => item.product_id === product._id
          );

          if (existingProductIndex === -1) {
            // Selected product not in the cart, add it
            existingProducts.push({
              product_id: product._id,
              qty: 1,
              total: total,
            });
            // Initialize totQty as 1 if it's not already set
            cartData.invoice.totQty = cartData.invoice.totQty
              ? cartData.invoice.totQty + 1
              : 1;
          } else {
            // Selected product already in the cart, update its quantity
            existingProducts[existingProductIndex].qty += 1;
            existingProducts[existingProductIndex].total += total;
          }
          // Update cart totals
          cartData.invoice.grandtotal = cartData.invoice.grandtotal
            ? Number(cartData.invoice.grandtotal)
            : 0 + total;
        }

        // Remove the _id field from MyCart object
        delete cartData.invoice._id;

        // Update the cart in the backend
        await addToMycart(cartData.invoice);

        navigate("/allinvoice", {
          state: { product: product, page: "MyCart" },
        });
      } catch (error) {
        console.error("Error handling buy click:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleViewCartClick = () => {
    if (!localStorage.getItem("name")) {
      navigate("/login");
    } else {
      navigate("/AllInvoice", { state: { page: "MyCart" } });
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3, 
    slidesToScroll: 1,
  };

  return (
    <>
      <Header />
      {!isMobile ? (
        <>
          <div className={styles.topDiv}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
              Music Cart
              <span>Home / {product.name}</span>
            </div>
            <span className={styles.viewCart} onClick={handleViewCartClick}>
              <img src={cartIcon} alt="cart" />
              View Cart {myCart && myCart.invoice.products.length}
            </span>
          </div>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/HomePage")}
          >
            Back to products
          </button>
          <div className={styles.heading}>{product.topFeatures}</div>
        </>
      ) : (
        <>
          <div className={styles.backImg}>
            {" "}
            <img
              src={backIcon}
              alt="file"
              onClick={() => navigate("/HomePage")}
            />{" "}
          </div>
          <button className={styles.topButton} onClick={handleBuyClick}>
            Buy Now
          </button>{" "}
        </>
      )}

      <div className={styles.mainContainer}>
        {!isMobile ? (
          <div className={styles.leftContainer}>
            <div className={styles.leftTopDiv}>
              <img src={product.images1} alt="img" />
            </div>
            <div className={styles.leftBottomDiv}>
              <img src={product.images2} alt="img" />
              <img src={product.images3} alt="img" />
              <img src={product.images4} alt="img" />
            </div>
          </div>
        ) : (
          <div className={styles.sliders}>
            <Slider {...sliderSettings}>
              <div>
                <img src={product.images1} alt="img" />
              </div>
              <div>
                <img src={product.images2} alt="img" />
              </div>
              <div>
                <img src={product.images3} alt="img" />
              </div>
              <div>
                <img src={product.images4} alt="img" />
              </div>
            </Slider>
          </div>
        )}

        <div className={styles.rightContainer}>
          <h2>{product.name}</h2>
          <div className={styles.reviews}>
            <img src={starIcon} alt="stars" />
            <img src={starIcon} alt="stars" />
            <img src={starIcon} alt="stars" />
            <img src={starIcon} alt="stars" />
            <img src={starIcon} alt="stars" />
            (50 Customer reviews)
          </div>
          <span style={{ fontWeight: "600", fontSize: "1rem" }}>
            Price - ₹ {product.price}
          </span>
          <span>
            {product.color} | {product.type}
          </span>
          <p>
            About this item <br />
            {product.about}
          </p>
          <span>
            {" "}
            <span style={{ fontWeight: "600" }}>Available</span> - In stock
          </span>
          <span>
            <span style={{ fontWeight: "600" }}>Brand</span> - {product.brand}
          </span>
          <button onClick={handleBuyClick} style={{ height: "6vh" }}>
            Add to cart
          </button>
          <button
            style={{ backgroundColor: "#FFB800", height: "6vh" }}
            onClick={handleBuyClick}
          >
            Buy Now
          </button>
        </div>
      </div>

      {!isMobile ? (
        <Footer />
      ) : (
        <FooterMenu
          selected={1}
          cart={myCart && myCart.invoice.products.length}
        />
      )}
    </>
  );
}

export default ProductPage;
