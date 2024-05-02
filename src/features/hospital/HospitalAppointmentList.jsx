import { FaBirthdayCake, FaPhone } from "react-icons/fa";
import {
  formatDateFirst,
  formatDateOfBirth,
  formatFullDate,
  formatYearDate,
  showTime,
} from "../../utils/Helper";
import styles from "./HospitalAppointmentList.module.css";

function HospitalAppointmentList({ patient, tab }) {
  const age = calculateAge(patient.patientId.patientDob);

  function calculateAge(dob1) {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  }

  return (
    <>
      {tab === "Desktop" && (
        <div role="row" className={styles.table}>
          <div className={styles.tableColumn}>
            {patient.patientId.patientName}
          </div>
          <div className={styles.tableColumn}>
            {formatDateOfBirth(patient.patientId.patientDob)}
          </div>
          <div className={styles.tableColumn}>{age}</div>
          <div className={styles.tableColumn}>
            {patient.patientId.patientContact}
          </div>
          <div className={styles.tableColumn}>
            {patient.patientId.patientEmail}
          </div>
          <div className={styles.tableColumn}>
            {formatFullDate(patient.bookingDate)}
          </div>
          <div className={styles.tableColumn}>
            {formatFullDate(patient.estimatedAppointmentTime)}
          </div>
          <div className={styles.tableColumn}>{patient.eta}</div>
          <div
            className={`${styles.tableColumn} ${
              patient.bookingStatus === "Booked"
                ? styles.confirm
                : styles.cancel
            }`}
          >
            <span style={{ marginLeft: "0.4em" }}>{patient.bookingStatus}</span>
          </div>
          <div
            className={`${styles.tableColumn} ${
              patient.checkInStatus === "Confirmed"
                ? styles.confirm
                : styles.cancel
            }`}
          >
            <span style={{ marginLeft: "0.4em" }}>{patient.checkInStatus}</span>
          </div>
        </div>
      )}
      {tab === "Mobile" && (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div style={{ display: "flex" }}>
              <div className={styles.cardTopLeftDiv}>
                <div>
                  <h3 className={styles.dateText}>
                    {formatDateFirst(patient.checkInDate)}
                  </h3>
                  <h2 className={styles.timeText}>
                    {showTime(patient.checkInDate)}
                  </h2>
                </div>
              </div>
              <div className={styles.cardTopRightDiv}>
                <div>
                  <span className={styles.patientName}>
                    {patient.patientId.patientName} ({age})
                  </span>
                  <span className={styles.patientDetailText}>
                    <FaBirthdayCake />{" "}
                    {formatDateOfBirth(patient.patientId.patientDob)}
                  </span>
                  <span className={styles.patientDetailText}>
                    <FaPhone /> {patient.patientId.patientContact}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className={styles.cardBottomLeftDiv}>
                <h2 className={styles.eta}>30 Mins</h2>
              </div>
              <div className={styles.cardBottomRightDiv}>
                <div className={styles.innerDiv}>
                  <span className={styles.bookingStatus}>
                    <span style={{ fontWeight: "bold" }}>Booking </span>
                    Booked
                  </span>
                  <span className={styles.bookingStatus}>
                    <span style={{ fontWeight: "bold" }}>Check In </span>
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HospitalAppointmentList;
