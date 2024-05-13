import { useState } from "react";
import styles from "../src/styles/ResendVerification.module.css";
import { MdClose } from "react-icons/md";

function ResendVerification({ onClose, btnClick }) {
  function handleBtnClick() {
    btnClick(email);
  }
  const [email, setEmail] = useState("");
  return (
    <div className={styles.overlay}>
      <div className={styles.styledModal}>
        <button onClick={onClose} className={styles.button}>
          <MdClose />
        </button>
        <div style={{ textAlign: "center" }}>
          <h1>Account Verification</h1>
          <br />
          <h3>Please provide your email address</h3>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: "2em",
              padding: "10px",
              border: "2px solid",
              borderRadius: "6px",
              width: "60%",
            }}
          />
          <br />
          <p></p>
          <button
            style={{
              padding: "10px",
              width: "60%",
              borderRadius: "5px",
              background: "#d3e6ff",
              border: "1px solid #d3e6ff",
              color: "#0165fc",
            }}
            onClick={handleBtnClick}
          >
            RESEND VERIFICATION EMAIL
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResendVerification;
