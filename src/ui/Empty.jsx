import styles from "./Empty.module.css";

function Empty({ resourceName }) {
  return <p className={styles.emptyListText}>No {resourceName}</p>;
}

export default Empty;
