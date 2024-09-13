import { FaCalendar, FaClock } from "react-icons/fa";
import {
  calculateAge,
  formatDateFirst,
  formatDateOfBirth,
  formatFullDate,
  showTime,
} from "../../utils/Helper";
import styles from "../../styles/HospitalPastCheckIns.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPastHospitalCheckins } from "../../services/data.service";
import Empty from "../../../pages/Empty";
import Spinner from "../../../pages/Spinner";

function HospitalPastCheckIns() {
  const { data: checkInList, isLoading } = useQuery({
    queryKey: ["hospitalPastCheckIns"],
    queryFn: fetchPastHospitalCheckins,
  });

  return (
    <div>
      <div className={styles.navTabName}>Past Appointments</div>
      {isLoading ? (
        <Spinner />
      ) : !checkInList || checkInList.length === 0 ? (
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
                    patient.checkInStatus
                      ? patient.checkInStatus === "Checked In"
                        ? styles.confirm
                        : styles.cancel
                      : ""
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
            <div className={styles.cardContainer}>
              {checkInList.map((patient) => (
                <div key={patient.id} className={styles.card}>
                  <div className={styles.appointmentdiv}>
                    <div
                      style={{
                        display: "flex",
                        borderRight: "1px solid grey",
                        width: "60%",
                      }}
                    >
                      <FaCalendar
                        size={20}
                        color="black"
                        style={{ marginRight: "0.7em" }}
                      />
                      <span className={styles.appointmenttext}>
                        {formatDateFirst(patient.checkInDate)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaClock
                        size={20}
                        color="black"
                        style={{ marginRight: "0.7em" }}
                      />
                      <span className={styles.appointmenttext}>
                        {showTime(patient.bookingDate)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.topdiv} style={{ display: "flex" }}>
                    <div>
                      <p className={styles.hospitalname}>
                        {patient.patientId.patientName}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className={styles.status}>
                        {patient.patientId.patientDob}
                      </p>
                      <p className={styles.status}>
                        {patient.patientId.patientContact}
                      </p>
                    </div>
                  </div>
                  <br />

                  <div className={styles.topdiv}>
                    <div className={styles.status} style={{ width: "50%" }}>
                      <span className={styles.status}>Check In Status:</span>
                      <p
                        className={`${styles.status} ${
                          patient.checkInStatus === "Checked In"
                            ? styles.bookingStatusConfirmed
                            : styles.bookingStatusCancelled
                        }`}
                      >
                        {patient.checkInStatus}
                      </p>
                    </div>
                    <div
                      className={styles.status}
                      style={{ width: "50%", textAlign: "right" }}
                    >
                      Booking Status:
                      <p
                        className={`${styles.status} ${
                          patient.bookingStatus === "Booked"
                            ? styles.bookingStatusConfirmed
                            : styles.bookingStatusCancelled
                        }`}
                      >
                        {patient.bookingStatus}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HospitalPastCheckIns;
