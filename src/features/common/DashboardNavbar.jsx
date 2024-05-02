import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardNavbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";

function DashboardNavbar({ feature }) {
  console.log(feature);
  const username = localStorage.getItem("rurban_cro_nm_ddn");
  const [nav, setNav] = useState(false);

  function logout() {
    console.log("inside");
    localStorage.clear();
    sessionStorage.clear();
  }

  function openNav() {
    setNav(!nav);
  }

  const completedClass = nav ? styles.openNav : styles.closeNav;

  return (
    <div className={styles.navbarSection}>
      <div className={styles.navbarTitle}>
        <img alt="logo" className={styles.navbarImg} src="/1.png" />
        {feature === "Patient" && (
          <span className={styles.navbarLinks}>Hi, {username}</span>
        )}
      </div>

      <div className={styles.desktopNavbar}>
        <ul className={styles.navbarItems}>
          <li>
            <Link
              to={`/dashboard/user/home?tab=hospitalList`}
              className={styles.navbarLinks}
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user/hospitals" className={styles.navbarLinks}>
              Hospitals
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user/checkIns" className={styles.navbarLinks}>
              My Check Ins
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout} className={styles.navbarLinks}>
              Logout
            </Link>
          </li>
        </ul>
      </div>

      <div className={`${styles.mobileNavbar} ${completedClass}`}>
        <div onClick={openNav} className={styles.mobileNavbarClose}>
          <IoIosCloseCircleOutline
            size={15}
            color="black"
            className={styles.hambIcon}
          />
        </div>
        <ul className={styles.mobileNavbarLinks}>
          <li>
            <Link
              onClick={openNav}
              to={`/dashboard/user/home?tab=hospitalList`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/dashboard/user/hospitals">
              Hospitals
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/dashboard/user/checkIns">
              My Check Ins
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </li>
          {/* <li>
            <button className={styles.logoutBtn} onClick={() => logout()}>
              <IoLogOutOutline size={30} />
            </button>
          </li> */}
        </ul>
      </div>

      <div className={styles.mobileNav}>
        <div className={styles.navTabUser}>
          <div style={{ marginBottom: "0.6em", fontSize: "12px" }}>
            {feature === "Hospitals" && (
              <div style={{ fontSize: "17px" }}>Welcome, {username}</div>
            )}
            {feature !== "Hospitals" && (
              <>
                <div style={{ fontSize: "17px" }}>Hi, {username}</div>

                <GiHamburgerMenu
                  size={15}
                  style={{ float: "right" }}
                  onClick={openNav}
                  className={styles.hambIcon}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
