import { Link, Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./sidebar.module.css";

function sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Link to="/"> Back To Home</Link>
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default sidebar;
