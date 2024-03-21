import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/Icons/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isMobile, setIsMobile] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handleUserSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (userData.email.trim() === "") {
      newErrors.email = "Field Is Required";
    }
    if (userData.password.trim() === "") {
        newErrors.password = "Field Is Required";
      }

    setErrors(newErrors);

    const resetForm = () => {
      setUserData({
        email: "",
        password: "",
      });
    };

    if (Object.keys(newErrors).length === 0) {
      // const response = await registerUser({ ...userData });
      // if (response) {
      //   localStorage.setItem("token", response.token);
      //   localStorage.setItem("name", response.name);
      resetForm();
      //   navigate("/dashboard");
      // }
      console.log("jaii");
    }
  };
  return (
    <div className={styles.mainDiv}>
      {isMobile ? (
        <div style={{ fontSize: "2.5rem", margin: "-5% 40% 5% 0%" , color:'#2E0052'}}>
          Welcome
        </div>
      ) : (
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          Music Cart
        </div>
      )}
      <div className={styles.mainContainer}>
        {isMobile ? <span>Sign in.<span style={{fontSize:'0.9rem', fontWeight:'400'}}>Already a customer?</span></span> :<span style={{fontSize:'1.5rem', fontWeight:'400'}}>Sign in</span>}

        <form onSubmit={handleUserSubmit} autoComplete="off">
          <label>Enter your email or mobile number</label>
          <input
            name="email"
            type="text"
            value={userData.email}
            onChange={handleOnChange}
          ></input>
          {errors.email && <div className={styles.errorText}>{errors.email}</div>}

          <label>Password</label>
          <input
            name="password"
            value={userData.password}
            onChange={handleOnChange}
          ></input>
          {errors.password && (
            <div className={styles.errorText}>{errors.password}</div>
          )}
        
          <button className={styles.submitBtn} type="submit">
            Continue
          </button>
          <p style={{ fontSize: "0.7rem", fontWeight: "400" }}>
          By continuing, you agree to Musicart privacy notice and conditions of use.
          </p>
        </form>
      </div>
            <span style={{fontSize:'0.8rem'}}><p className={styles.straightline}></p>------ New to Musicart? ------</span>
        <button className={styles.regBtn} onClick={()=> navigate("/register")}>
        Create your Musicart account
          </button>
    </div>
  );
  
}

export default Login;
