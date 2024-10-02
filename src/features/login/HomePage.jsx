import styles from "../../styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.mainsection}>
      <div className={styles.leftdiv}>
        <img alt="logo" className={styles.logoimg} src="/1.png" />
        <div className={styles.brandnamediv}>
          <span className={styles.hometext}>Welcome to </span>
          <span className={styles.brandname}>Rurban</span>
          <p></p>
          <span className={styles.homedesc}>
          A Platform enabling instant emergency check-ins, connecting patients with nearby hospitals for faster, more efficient care while allowing patients to notify hospitals in real-time for timely preparation.
          </span>
          <div className={styles.btngrp}>
            <p className={styles.logintext}>Sign in to access your account</p>
            <button
              className={styles.loginbtn}
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
            <div className={styles.signupdiv}>
              <span className={styles.logintext}>
                Don&apos;t have an account?
                <button
                  className={styles.registerbtn}
                  onClick={() => navigate("/signup/user")}
                >
                  REGISTER AS PATIENT
                </button>
                <button
                  className={styles.registerbtn}
                  onClick={() => navigate("/signup/er")}
                >
                  REGISTER AS HOSPITAL
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightdiv}>
        <img
          alt="home"
          src="https://i.pinimg.com/736x/c6/7c/c1/c67cc114fc289a3eacc442da873053b2.jpg"
        ></img>
      </div>
    </div>
  );
}

export default HomePage;
