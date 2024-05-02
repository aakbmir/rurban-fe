import React from "react";
import styles from "./FormRow.module.css";

function FormRow({ label, error, children }) {
  return (
    <div className={styles.styledFormRow}>
      {label && (
        <label className={styles.label} htmlFor={children.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={styles.span}>{error}</span>}
    </div>
  );
}

export default FormRow;
