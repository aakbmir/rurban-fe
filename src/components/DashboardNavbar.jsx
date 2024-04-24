import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./DashboardNavbar.module.css";
import { FaSearch } from "react-icons/fa";

function DashboardNavbar({ searchValue, feature }) {
  const username = localStorage.getItem("username");
  const [nav, setNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function openNav() {
    setNav(!nav);
  }

  function handleSearch(e) {
    setSearchTerm((prevState) => e);
    console.log("eeee", e);
    searchValue(e);
  }

  return (
    <div className={styles.navbarSection}>
      <h1 className={styles.navbarTitle}>
        <Link to="/">
          Rurban <span className={styles.navbarSign}>+</span>
        </Link>
      </h1>
      {/* Desktop */}
      <ul className={styles.navbarItems}>
        <li>
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
        </li>
        <li>
          <div className={styles.navbarLinks}>Hi, {username}</div>
        </li>
      </ul>
      {/* Mobile */}
      <div
        className={`${styles.mobileNavbar} ${
          nav ? styles.openNav : styles.closenav
        }`}
      >
        <div onClick={openNav} className={styles.mobileNavbarclose}>
          <MdOutlineClose className={styles.hambIcon} />
        </div>
        <ul className={styles.mobileNavbarLinks}>
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className={styles.mobileNav}>
        <div className={styles.navtabuser}>Hi, {username}</div>
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
