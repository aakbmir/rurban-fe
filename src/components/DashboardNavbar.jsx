import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./DashboardNavbar.module.css";
import { FaSearch } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

function DashboardNavbar({ searchValue, feature }) {
  const username = localStorage.getItem("username");
  const [nav, setNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("username");
    navigate("/");
  }

  function openNav() {
    setNav(!nav);
  }

  function handleSearch(e) {
    setSearchTerm((prevState) => e);
    searchValue(e);
  }

  return (
    <div className={styles.navbarSection}>
      {/* Desktop */}
      <ul className={styles.navbarItems}>
        <li>
          <h1 className={styles.navbarTitle}>
            <Link to="/">
              Rurban <span className={styles.navbarSign}>+</span>
            </Link>
          </h1>
        </li>
        <li>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <FaSearch color="#666464" className={styles.searchIcon} />
          </div>
        </li>
        <li>
          <div className={styles.navbarLinks}>
            Hi, {username}
            <span className={styles.logoutSpan}>
              <button
                className={styles.logoutBtn}
                onClick={() => logout()}
                title="logout"
              >
                <IoLogOutOutline color="black" size={30} />
              </button>
            </span>
          </div>
        </li>
      </ul>

      <div className={styles.mobileNav}>
        <div className={styles.navtabuser}>
          Hi, {username}
          <span className={styles.logoutSpan}>
            <button className={styles.logoutBtn} onClick={() => logout()}>
              <IoLogOutOutline size={30} />
            </button>
          </span>
        </div>
        <div className={styles.navtabuser}>
          <div className={styles.navTabName}>{feature}</div> for you
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch color="black" className={styles.searchIcon} />
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
