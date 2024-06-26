import React from "react";
import { useNavigate } from "react-router-dom";
import styles2 from "./FooterMenu.module.css";
import homeIcon from "../../assets/Icons/Home.png";
import personIcon from "../../assets/Icons/Person.png";
import cartIcon from "../../assets/Icons/Cart.png";

function FooterMenu(props) {
  const navigate = useNavigate();
  const IsLogin = !!localStorage.getItem("name");
  const toggleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  return (
    <div className={styles2.headerDiv}>
      <span onClick={() => navigate("/HomePage")}>
        {props.selected === 1 && <p className={styles2.selected}></p>}
        <img src={homeIcon} alt="home" />
        Home
      </span>
      <span
        onClick={() => navigate("/allinvoice", { state: { page: "MyCart" } })}
      >
        {props.selected === 2 && <p className={styles2.selected}></p>}
        <div className={styles2.count}>{props.cart}</div>
        <img
          src={cartIcon}
          alt="cart"
          style={{ height: "2.5vh", width: "5vw" }}
        />
        Cart
      </span>
      {!IsLogin ? (
        <span onClick={() => navigate("/Login")}>
          {props.selected === 3 && <p className={styles2.selected}></p>}
          <img src={personIcon} alt="person" />
          Login
        </span>
      ) : (
        <span onClick={toggleLogout}>
          {props.selected === 3 && <p className={styles2.selected}></p>}
          <img src={personIcon} alt="person" />
          Logout
        </span>
      )}
    </div>
  );
}

export default FooterMenu;
