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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [headphoneTypes, setHeadphoneTypes] = useState([]);
  const [headphoneCompanies, setHeadphoneCompanies] = useState([]);
  const [headphoneColors, setHeadphoneColors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    headphoneType: '',
    headphoneCompany: '',
    headphoneColor: '',
    priceRange: '',
    sortBy: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);

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

  const handleFilterChange = (filterType, value) => {
    if (value === 'featured') {
      setSelectedFilters(prevFilters => ({ ...prevFilters, [filterType]: '' }));
      let filteredProducts = [...products];
  
      // Apply selected filters to the search results
      Object.keys(selectedFilters).forEach(filter => {
        const filterValue = selectedFilters[filter];
        if (filterValue && filter !== filterType) {
          switch(filter) {
            case 'headphoneType':
              filteredProducts = filteredProducts.filter(product => product.type === filterValue);
              break;
            case 'headphoneCompany':
              filteredProducts = filteredProducts.filter(product => product.brand === filterValue);
              break;
            case 'headphoneColor':
              filteredProducts = filteredProducts.filter(product => product.color === filterValue);
              break;
            case 'priceRange':
              switch(filterValue) {
                case 'a':
                  filteredProducts = filteredProducts.filter(product => product.price >= 0 && product.price <= 1000);
                  break;
                case 'b':
                  filteredProducts = filteredProducts.filter(product => product.price > 1000 && product.price <= 10000);
                  break;
                case 'c':
                  filteredProducts = filteredProducts.filter(product => product.price > 10000 && product.price <= 20000);
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
        }
      });
  
      setFilteredProducts(filteredProducts);
      return;
    }
  
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
    let filteredProducts = [...products];
  
    switch(filterType) {
      case 'headphoneType':
        filteredProducts = value ? filteredProducts.filter(product => product.type === value) : products;
        break;
      case 'headphoneCompany':
        filteredProducts = value ? filteredProducts.filter(product => product.brand === value) : products;
        break;
      case 'headphoneColor':
        filteredProducts = value ? filteredProducts.filter(product => product.color === value) : products;
        break;
      case 'priceRange':
        switch(value) {
          case 'a':
            filteredProducts = filteredProducts.filter(product => product.price >= 0 && product.price <= 1000);
            break;
          case 'b':
            filteredProducts = filteredProducts.filter(product => product.price > 1000 && product.price <= 10000);
            break;
          case 'c':
            filteredProducts = filteredProducts.filter(product => product.price > 10000 && product.price <= 20000);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  
    setFilteredProducts(filteredProducts);
  };
  
  const handleSortChange = (value) => {
    if (value === 'featured') {
      setSelectedFilters({ ...selectedFilters, sortBy: '' });
      setFilteredProducts(products);
      return;
    }
  
    setSelectedFilters({ ...selectedFilters, sortBy: value });
    let sortedProducts = [...filteredProducts];
  
    switch(value) {
      case 'priceLow':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  
    setFilteredProducts(sortedProducts);
  };
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    let filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // Apply selected filters to the search results
    Object.keys(selectedFilters).forEach(filterType => {
      const value = selectedFilters[filterType];
      if (value) {
        switch(filterType) {
          case 'headphoneType':
            filteredProducts = filteredProducts.filter(product => product.type === value);
            break;
          case 'headphoneCompany':
            filteredProducts = filteredProducts.filter(product => product.brand === value);
            break;
          case 'headphoneColor':
            filteredProducts = filteredProducts.filter(product => product.color === value);
            break;
          case 'priceRange':
            switch(value) {
              case 'a':
                filteredProducts = filteredProducts.filter(product => product.price >= 0 && product.price <= 1000);
                break;
              case 'b':
                filteredProducts = filteredProducts.filter(product => product.price > 1000 && product.price <= 10000);
                break;
              case 'c':
                filteredProducts = filteredProducts.filter(product => product.price > 10000 && product.price <= 20000);
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      }
    });

    setFilteredProducts(filteredProducts);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    if (words.length >= 2) {
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    } else {
      return name[0].toUpperCase();
    }
  };

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
    {getInitials(localStorage.getItem('name'))}
    {ShowDP && (
      <div className={styles.dropdown}>
        <span onClick={(e) => e.stopPropagation()}>
          {localStorage.getItem('name')}
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
          value={searchQuery}
          onChange={handleSearch}
          style={{height:'80%'}}
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

          <select id="headphoneType" style={{ maxWidth: "19%" }} onChange={(e) => handleFilterChange('headphoneType', e.target.value)}>
            <option value="" disabled selected>
              Headphone type
            </option>
            <option value="featured">Featured</option>
            {headphoneTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Select dropdown for headphone companies */}
          <select id="headphoneComp" style={{ maxWidth: "14%" }} onChange={(e) => handleFilterChange('headphoneCompany', e.target.value)}>
            <option value="" disabled selected>
              Company
            </option>
            <option value="featured">Featured</option>
            {headphoneCompanies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>

          {/* Select dropdown for headphone colors */}
          <select id="headphoneColor" style={{ maxWidth: "12%" }} onChange={(e) => handleFilterChange('headphoneColor', e.target.value)}>
            <option value="" disabled selected>
              Colour
            </option>
            <option value="featured">Featured</option>
            {headphoneColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>

          <select id="priceRange" style={{ maxWidth: "13%" }} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
            <option value="" disabled selected>
              Price
            </option>
            <option value="featured">Featured</option>
            <option value="a">₹0 - ₹1,000</option>
            <option value="b">₹1,000 - ₹10,000</option>
            <option value="c">₹10,000 - ₹20,000</option>
          </select>
        </div>

        <select id="sortBy" style={{ maxWidth: "18%" }} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="featured">Sort by : Featured</option>
          <option value="priceLow">Price : Lowest</option>
          <option value="priceHigh">Price : Highest</option>
          <option value="nameAZ">Name : (A-Z)</option>
          <option value="nameZA">Name : (Z-A)</option>
        </select>
      </div>

      {!ShowList ? (
        <div className={styles.mainContainer}>
          {/* ProductGrid component */}
          {filteredProducts.map(product => (
            <ProductGrid
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className={styles.mainContainer}>
          {/* ProductList component */}
          {filteredProducts.map(product => (
            <ProductList
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      {ShowFeedback && <FeedBack />}
      {isMobile && 
      <div
      className={styles.feedbackDIv}
      onClick={() => setShowFeedback(!ShowFeedback)}
    >
      {" "}
      <img src={feedIcon} alt="img" />{" "}
    </div>}
      
      {!isMobile ? <Footer /> : <FooterMenu selected={1} />}
    </>
  );
}

export default HomePage;
