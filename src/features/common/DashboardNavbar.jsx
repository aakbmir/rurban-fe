import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/DashboardNavbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

function DashboardNavbar({ user }) {
  const username = localStorage.getItem("rurban_cro_nm_ddn");
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  function clearClientQuery() {
    // queryClient.invalidateQueries(["UserCheckIns"]);
  }

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  function exit() {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }
  function openNav() {
    setNav(!nav);
  }

  const completedClass = nav ? styles.openNav : styles.closeNav;

  return (
    <div className={styles.navbarSection}>
      <div className={styles.desktopNavbar}>
        <div className={styles.navbarTitle}>
          <img alt="logo" className={styles.navbarImg} src="/1.png" />
          {user === "patient" && (
            <span className={styles.navbarLinks}>Hi, {username}</span>
          )}
          {user === "hospital" && (
            <span className={styles.navbarLinks}>Hi, {username}</span>
          )}
        </div>
        {user === "patient" && (
          <ul className={styles.navbarItems}>
            <li>
              <Link
                onClick={clearClientQuery}
                to={`/dashboard/user/home?tab=hospitalList`}
                className={styles.navbarLinks}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/user/hospitals"
                className={styles.navbarLinks}
              >
                Hospitals
              </Link>
            </li>
            <li>
              <Link
                onClick={clearClientQuery}
                to="/dashboard/user/checkIns"
                className={styles.navbarLinks}
              >
                My Check Ins
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logout} className={styles.navbarLinks}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {user === "hospital" && (
          <ul className={styles.navbarItems}>
            <li>
              <Link to="/" onClick={logout} className={styles.navbarLinks}>
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className={`${styles.mobileNavbar} ${completedClass}`}>
        <div onClick={openNav} className={styles.mobileNavbarClose}>
          <IoIosCloseCircleOutline
            size={30}
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
        </ul>
      </div>

      <div className={styles.mobileNav}>
        <div className={styles.navbarTitle}>
          <img alt="logo" className={styles.navbarImg} src="/1.png" />

          <span className={styles.navbarLinks}>
            <p className={styles.welcometext}>Welcome back,</p>
            <span className={styles.usertext}>{username}</span>
          </span>
        </div>
        {user === "patient" && (
          <GiHamburgerMenu
            size={30}
            style={{ float: "right" }}
            onClick={openNav}
            className={styles.hambIcon}
          />
        )}
        {user === "hospital" && (
          <MdLogout
            size={30}
            style={{ float: "right" }}
            onClick={exit}
            className={styles.hambIcon}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardNavbar;
