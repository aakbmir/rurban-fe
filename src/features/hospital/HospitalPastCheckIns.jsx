import { FaBirthdayCake, FaPhone } from "react-icons/fa";
import {
  formatDateFirst,
  formatDateOfBirth,
  formatFullDate,
  showTime,
} from "../../utils/Helper";
import styles from "../../styles/HospitalPastCheckIns.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPastHospitalCheckins } from "../../services/data.service";
import Empty from "../common/Empty";
import Spinner from "../common/Spinner";

function HospitalPastCheckIns() {
  const { data: checkInList, isLoading } = useQuery({
    queryKey: ["checkinList"],
    queryFn: fetchPastHospitalCheckins,
  });

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
    <div>
      <div className={styles.navTabName}>Past Appointments</div>
      {isLoading ? (
        <Spinner />
      ) : !checkInList ? (
        <Empty resourceName="Check Ins" />
      ) : (
        <>
          <div role="table" className={`${styles.desktopNav} ${styles.table}`}>
            <header role="row" className={styles.header}>
              <div className={styles.headerColumns}>Name</div>
              <div className={styles.headerColumns}>Date of Birth</div>
              <div className={styles.headerColumns}>Age</div>
              <div className={styles.headerColumns}>Contact</div>
              <div className={styles.headerColumns}>Email</div>
              <div className={styles.headerColumns}>Appointment Date</div>
              <div className={styles.headerColumns}>Estimated Arrival Time</div>

              <div className={styles.headerColumns}>Booking Status</div>
              <div className={styles.headerColumns}>Check In Status</div>
              <div className={styles.headerColumns}>Check In Time</div>
            </header>
            {checkInList.map((patient) => (
              <div key={patient.id} role="row" className={styles.tableData}>
                <div className={styles.tableColumn}>
                  {patient.patientId.patientName}
                </div>
                <div className={styles.tableColumn}>
                  {formatDateOfBirth(patient.patientId.patientDob)}
                </div>
                <div className={styles.tableColumn}>
                  {calculateAge(patient.patientId.patientDob)}
                </div>
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

                <div
                  className={`${styles.tableColumn} ${
                    patient.bookingStatus === "Booked"
                      ? styles.confirm
                      : styles.cancel
                  }`}
                >
                  <span style={{ marginLeft: "0.4em" }}>
                    {patient.bookingStatus}
                  </span>
                </div>
                <div
                  className={`${styles.tableColumn} ${
                    patient.checkInStatus === "Checked In"
                      ? styles.confirm
                      : styles.cancel
                  }`}
                >
                  <span style={{ marginLeft: "0.4em" }}>
                    {patient.checkInStatus}
                  </span>
                </div>
                <div className={styles.tableColumn}>
                  {formatFullDate(patient.estimatedAppointmentTime)}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mobileNav}>
            {checkInList.map((patient) => (
              <div key={patient.id} className={styles.cardContainer}>
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
                          {patient.patientId.patientName}
                          {calculateAge(patient.patientId.patientDob)}
                        </span>
                        <span className={styles.patientDetailText}>
                          <FaBirthdayCake />
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
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HospitalPastCheckIns;
