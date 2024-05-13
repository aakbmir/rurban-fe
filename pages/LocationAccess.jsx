import { toast } from "react-toastify";

import styles from "../src/styles/LocationAccess.module.css";
import { useNavigate } from "react-router-dom";

function LocationAccess() {
  const navigate = useNavigate();

  function getPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      localStorage.setItem(
        "userLocation",
        pos.coords.latitude + "," + pos.coords.longitude
      );
    });
  }

  function fetchCustomersLocation(action) {
    toast.success("Login Successful!!", {
      position: "bottom-center",
    });
    if (action === "allow") {
      getPosition();
    }
    navigate("/dashboard/user/home?tab=hospitalList");
  }

  return (
    <div className={styles.styledModal}>
      <img
        alt="pin"
        style={{ display: "flex", margin: "auto", marginTop: "5em" }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzVv_zD8m8AsVcyaycrkeyDR2gssqffmo2M6VQGcYFA&s"
      />
      <div style={{ textAlign: "center" }}>
        <span className={styles.loc}>Your Location is needed</span>
        <p className={styles.locText}>
          Allow Rurban to access your location while you use the app?
        </p>
        <p></p>
        <br />
        <button
          className={styles.allowButton}
          onClick={() => fetchCustomersLocation("allow")}
        >
          ENABLE LOCATION SERVICES
        </button>
        <button
          className={styles.cancelButton}
          onClick={() => fetchCustomersLocation("not-allow")}
        >
          Not now
        </button>
      </div>
    </div>
  );
}

export default LocationAccess;
