import { useNavigate } from "react-router-dom";
import styles from "./AccessNavbar.module.css";
import { IoIosArrowBack } from "react-icons/io";

function Navbar({ title }) {
  const navigate = useNavigate();
  return (
    <div className={styles.navbarSection}>
      <button onClick={() => navigate("/")} className={styles.navbarbutton}>
        <IoIosArrowBack size={30} style={{ color: "white" }} />
      </button>
      <h1 className={styles.navbarTitle}>{title}</h1>
    </div>
  );
}

export default Navbar;
