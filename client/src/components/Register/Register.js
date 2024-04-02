import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/Icons/logo.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { toast } from "react-toastify";

function Register() {
  const [isMobile, setIsMobile] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
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
  };
  const handleUserSubmit = async (e) => {
    e.preventDefault();

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(userData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    // Check if other fields are filled
    if (
      userData.name.trim() === "" ||
      userData.email.trim() === "" ||
      userData.password.trim() === ""
    ) {
      toast.error("Please check all fields");
      return;
    }

    const response = await registerUser({ ...userData });
    if (response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("name", response.name);
      setUserData({
        name: "",
        mobile: "",
        email: "",
        password: "",
      });
      navigate("/homepage");
    }
  };

  return (
    <div className={styles.mainDiv}>
      {isMobile ? (
        <div
          style={{
            fontSize: "2.5rem",
            margin: "-5% 40% 5% 0%",
            color: "#2E0052",
          }}
        >
          Welcome
        </div>
      ) : (
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          Music Cart
        </div>
      )}
      <div className={styles.mainContainer}>
        {isMobile ? (
          <span>
            Create Account.
            <span style={{ fontSize: "0.7rem", fontWeight: "300" }}>
              Don’t have an account?
            </span>
          </span>
        ) : (
          <span>Create Account</span>
        )}

        <form onSubmit={handleUserSubmit} autoComplete="off">
          <label>Your Name</label>
          <input
            name="name"
            type="text"
            value={userData.name}
            onChange={handleOnChange}
          ></input>

          <label>Mobile Number</label>
          <input
            name="mobile"
            type="number"
            value={userData.mobile}
            onChange={handleOnChange}
          ></input>

          <label>Email Id</label>
          <input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleOnChange}
          ></input>

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={userData.password}
            onChange={handleOnChange}
          ></input>

          <p style={{ fontSize: "0.7rem" }}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </p>
          <button className={styles.submitBtn} type="submit">
            Continue
          </button>
          <p style={{ fontSize: "0.6rem", fontWeight: "400" }}>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </form>
      </div>
      <span>
        Already have an account?{" "}
        <u onClick={() => navigate("/login")}>Sign in</u>
      </span>
    </div>
  );
}

export default Register;
