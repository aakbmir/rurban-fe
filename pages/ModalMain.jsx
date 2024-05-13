import styles from "../src/styles/ModalMain.module.css";
import { MdClose } from "react-icons/md";

function ModalMain({ children, onClose, onSubmit, cancel, submit }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.styledModal}>
        <button onClick={onClose} className={styles.button}>
          <MdClose />
        </button>
        <div style={{ textAlign: "center" }}>
          {children}
          <p></p>
          <br />
          <button
            style={{
              padding: "10px",
              width: "34%",
              borderRadius: "5px",
              background: "#d3e6ff",
              border: "1px solid #d3e6ff",
              color: "#0165fc",
              marginRight: "1em",
            }}
            onClick={onClose}
          >
            {cancel}
          </button>
          <button
            style={{
              padding: "10px",
              width: "34%",
              borderRadius: "5px",
              background: "#0165fc",
              border: "none",
              color: "#fff",
            }}
            onClick={onSubmit}
          >
            {submit}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMain;
