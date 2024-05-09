import { FaCalendar, FaClock, FaUserCheck, FaUserSlash } from "react-icons/fa";
import {
  formatDateFirst,
  formatDateOfBirth,
  formatFullDate,
  showTime,
} from "../../utils/Helper";
import styles from "../../styles/HospitalUpcomingCheckIns.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  clinicCheckInUpdate,
  fetchHospitalCheckins,
} from "../../services/data.service";
import { toast } from "react-toastify";
import Empty from "../common/Empty";
import Spinner from "../common/Spinner";

function HospitalUpcomingCheckIns() {
  const { data: upcomingCheckInsList, isLoading } = useQuery({
    queryKey: ["hospitalUpcomingCheckIns"],
    queryFn: fetchHospitalCheckins,
  });

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: clinicCheckInUpdate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["hospitalUpcomingCheckIns"] });
      queryClient.invalidateQueries({ queryKey: ["hospitalPastCheckIns"] });
      queryClient.invalidateQueries({ queryKey: ["UserUpcomingCheckIns"] });
    },
    onError: () => {
      toast.error("Something went wrong!!", {
        position: "bottom-center",
      });
    },
  });

  async function handleCheckIn(id, clickedBtn) {
    const data = {
      id: id,
      action: clickedBtn,
    };
    await mutateAsync(data);
  }

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
      <div className={styles.navTabName}>Upcoming Appointments</div>
      {isLoading ? (
        <Spinner />
      ) : upcomingCheckInsList.length === 0 ? (
        <Empty resourceName="Upcoming Appointments" />
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
              <div className={styles.headerColumns}>ETA</div>
              <div className={styles.headerColumns}>Booking Status</div>
              <div className={styles.headerColumns}></div>
            </header>
            {upcomingCheckInsList.map((patient) => (
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
                <div className={`${styles.tableColumn} ${styles.eta}`}>
                  {patient.eta} mins
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
                  className={styles.tableColumn}
                  style={{ borderRight: "none", justifyContent: "flex-end" }}
                >
                  <button
                    onClick={() => handleCheckIn(patient.id, "checkIn")}
                    title="Confirm Patient CheckIn"
                    style={{
                      marginRight: "1.3em",
                      border: "none",
                      background: "none",
                      color: "#33528b",
                    }}
                  >
                    <FaUserCheck size={20} />
                  </button>
                  <button
                    onClick={() => handleCheckIn(patient.id, "noshow")}
                    title="Confirm Patient as No-Show"
                    style={{
                      border: "none",
                      background: "none",
                      color: "#f3726e",
                    }}
                  >
                    <FaUserSlash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mobileNav}>
            <div className={styles.cardContainer}>
              {upcomingCheckInsList.map((patient) => (
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

                  {patient.bookingStatus === "Booked" &&
                    !patient.checkInStatus && (
                      <div className={styles.topdiv}>
                        <button
                          className={styles.cancelBtn}
                          onClick={() => handleCheckIn(patient.id, "checkIn")}
                        >
                          CheckIn
                        </button>

                        <button
                          className={styles.directionBtn}
                          onClick={() => handleCheckIn(patient.id, "noshow")}
                        >
                          No Show
                        </button>
                      </div>
                    )}
                </div>

                // <div key={patient.id} className={styles.cardContainer}>
                //   <div className={styles.card}>
                //     <div style={{ display: "flex" }}>
                //       <div className={styles.cardTopLeftDiv}>
                //         <span className={styles.dateText}>
                //           {formatDateFirst(patient.bookingDate)}
                //         </span>
                //         <div className={styles.timeText}>
                //           {showTime(patient.bookingDate)}
                //         </div>
                //       </div>
                //       <div className={styles.cardTopRightDiv}>
                //         <span className={styles.patientName}>
                //           {patient.patientId.patientName}
                //         </span>
                //         <span className={styles.patientDetailText}>
                //           {formatDateOfBirth(patient.patientId.patientDob)}
                //         </span>
                //         <span className={styles.patientDetailText}>
                //           {patient.patientId.patientContact}
                //         </span>
                //       </div>
                //     </div>
                //     <div style={{ display: "flex" }}>
                //       <div className={styles.cardBottomLeftDiv}>
                //         <h2 className={styles.eta}>30 Mins</h2>
                //       </div>
                //       <div className={styles.cardBottomRightDiv}>
                //         <div
                //           className={styles.innerDiv}
                //           style={{ display: "block" }}
                //         >
                //           <div style={{ textAlign: "left" }}>
                //             <span className={styles.status}>
                //               Booking Status:{" "}
                //             </span>
                //             <span className={styles.bookingStatus}>
                //               {patient.bookingStatus}
                //             </span>
                //           </div>
                //           <div style={{ textAlign: "left" }}>
                //             <span className={styles.status}>
                //               Check In Status:{" "}
                //             </span>
                //             <span className={styles.bookingStatus}>
                //               {patient.checkInStatus
                //                 ? patient.checkInStatus
                //                 : "-"}
                //             </span>
                //           </div>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              ))}
            </div>
          </div>
          <hr style={{ borderTop: "1px solid grey", marginTop: "3em" }} />
        </>
      )}
    </div>
  );
}

export default HospitalUpcomingCheckIns;
