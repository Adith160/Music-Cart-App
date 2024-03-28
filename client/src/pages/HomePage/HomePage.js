import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import logo from "../../assets/Icons/logo.png";
import girlImage from "../../assets/Images/Girl.png";
import searchIcon from "../../assets/Icons/Search.png";
import gridIcon from "../../assets/Icons/Grid.png";
import gridSelIcon from "../../assets/Icons/GridSel.png";
import menuIcon from "../../assets/Icons/Menu.png";
import menuSelIcon from "../../assets/Icons/MenuSel.png";
import feedIcon from "../../assets/Icons/FeedBack.png";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/Icons/Cart2.png";
import FeedBack from "../../components/FeedBack/FeedBack";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductList from "../../components/ProductList/ProductList";
import { getAllProducts } from "../../api/product";

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [ShowDP, setShowDP] = useState(false);
  const [ShowFeedback, setShowFeedback] = useState(false);
  const [ShowList, setShowList] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [headphoneTypes, setHeadphoneTypes] = useState([]);
  const [headphoneCompanies, setHeadphoneCompanies] = useState([]);
  const [headphoneColors, setHeadphoneColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);

        // Extracting unique types, companies, and colors from productsData
        const types = [...new Set(productsData.map(product => product.type))];
        const brand = [...new Set(productsData.map(product => product.brand))];
        const colors = [...new Set(productsData.map(product => product.color))];

        setHeadphoneTypes(types);
        setHeadphoneCompanies(brand);
        setHeadphoneColors(colors);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setIsLogin(!!localStorage.getItem("name"));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const handleShowDpClick = () => {
    setShowDP(!ShowDP);
  };

  const toggleLogout=(e)=>{
    e.stopPropagation()
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }

  const handleViewCartClick = ()=>{
    if(!IsLogin){
      navigate('/login');
    }else{
      navigate('/AllInvoice', {state:{page:'MyCart'}})
    }
  }
  return (
    <>
      <Header />
      {!isMobile && (
        <>
          <div className={styles.topDiv}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
              Music Cart
              <span>Home / Invoices</span>
            </div>
            {IsLogin && 
            <div className={styles.profileDiv}>
            <span className={styles.viewCart} onClick={()=>handleViewCartClick()}>
              <img src={cartIcon} alt="cart" />
              View Cart
            </span>
            <div className={styles.dpDiv} onClick={handleShowDpClick}>
              AK
              {ShowDP && (
                <div className={styles.dropdown}>
                  <span onClick={(e) => e.stopPropagation()}>
                    Nameuu biaciciiaci
                  </span>
                  <br />
                  <span onClick={toggleLogout}>Logout</span>
                </div>
              )}
            </div>
          </div>}
          </div>
        </>
      )}

      <div className={styles.topDownDiv}>
        <div className={styles.insideDiv}>
          <span>
            Grab upto 50% off on <br /> Selected headphones
          </span>
          <img src={girlImage} alt="img" />
        </div>
      </div>

      <div className={styles.searchDiv}>
        {" "}
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search by Product Name"
        />
      </div>

      <div className={styles.filterDiv}>
        <div className={styles.filters}>
          {!ShowList ? (
            <div className={styles.menu}>
              <img
                src={gridSelIcon}
                alt="grid"
                onClick={() => ShowList? setShowList(false):''}
              />
              <img
                src={menuIcon}
                alt="menu"
                onClick={() => !ShowList ? setShowList(true):''}
              />{" "}
            </div>
          ) : (
            <div className={styles.menu}>
              <img
                src={gridIcon}
                alt="grid"
                onClick={() => ShowList? setShowList(false):''}
              />
              <img
                src={menuSelIcon}
                alt="menu"
                onClick={() => !ShowList ? setShowList(true):''}
              />{" "}
            </div>
          )}

<select id="headphoneType" style={{ maxWidth: "19%" }}>
            <option value="" disabled selected>
              Headphone type
            </option>
            {headphoneTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Select dropdown for headphone companies */}
          <select id="headphoneComp" style={{ maxWidth: "14%" }}>
            <option value="" disabled selected>
              Company
            </option>
            {headphoneCompanies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>

          {/* Select dropdown for headphone colors */}
          <select id="headphoneColor" style={{ maxWidth: "12%" }}>
            <option value="" disabled selected>
              Colour
            </option>
            {headphoneColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>

          <select id="headphoneColor" style={{ maxWidth: "13%" }}>
            <option value="" disabled selected>
              Price
            </option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </select>
        </div>

        <select id="sortBy" style={{ maxWidth: "18%" }}>
          <option value="" disabled selected>
            Sort by : Featured
          </option>
          <option value="a">Price : Lowest</option>
          <option value="b">Price : Highest</option>
          <option value="b">Name : (A-Z)</option>
          <option value="b">Name : (Z-A)</option>
        </select>
      </div>

       {!ShowList ? (
        <div className={styles.mainContainer}>
          {/* ProductGrid component */}
          {products.map(product => (
            <ProductGrid
              key={product.id}
              image={product.images1}
              name={product.name}
              desc={product.desc}
              price={product.price}
              type={product.type}
              color={product.color}
            />
          ))}
        </div>
      ) : (
        <div className={styles.mainContainer}>
          {/* ProductList component */}
          {products.map(product => (
            <ProductList
              key={product.id}
              image={product.images1}
              name={product.name}
              desc={product.about}
              price={product.price}
              type={product.type}
              color={product.color}
            />
          ))}
        </div>
      )}

      {ShowFeedback && <FeedBack />}
      <div
        className={styles.feedbackDIv}
        onClick={() => setShowFeedback(!ShowFeedback)}
      >
        {" "}
        <img src={feedIcon} alt="img" />{" "}
      </div>
      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default HomePage;
