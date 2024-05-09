import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../../styles/DashboardNavbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

function DashboardNavbar({ user }) {
  const username = localStorage.getItem("rurban_cro_nm_ddn");
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    logout();
  }

  function exit() {
    handleLogout();
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
              <NavLink
                to={`/dashboard/user/home?tab=hospitalList`}
                className={styles.navbarLinks}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/hospitals"
                className={styles.navbarLinks}
              >
                Hospitals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/checkIns"
                className={styles.navbarLinks}
              >
                My Check Ins
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={handleLogout}
                className={styles.navbarLinks}
              >
                Logout
              </NavLink>
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
            <Link to="/" onClick={handleLogout}>
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
