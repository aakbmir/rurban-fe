import styles from "../../styles/Modal.module.css";
import { MdClose } from "react-icons/md";

function Modal({ children, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.styledModal}>
        <button onClick={onClose} className={styles.button}>
          <MdClose />
        </button>
        <div>
          {children}

          <button onClick={onClose}>Close</button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
