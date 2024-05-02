import DashboardNavbar from "../common/DashboardNavbar";
import styles from "./HospitalDashboard.module.css";
import { fetchHospitalCheckins } from "../../services/data.service";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../common/Spinner";
import Empty from "../../ui/Empty";
import HospitalAppointmentList from "./HospitalAppointmentList";

function HospitalDashboard() {
  console.log("inside hd");
  const { data: patientList, isLoading } = useQuery({
    queryKey: ["Patients"],
    queryFn: fetchHospitalCheckins,
  });

  return (
    <div>
      <DashboardNavbar feature="Hospitals" />
      <div
        className={styles.navTabName}
        style={{ display: "flex", justifyContent: "stretch" }}
      >
        <span style={{ width: "80%" }}>Appointments</span>
      </div>
      {isLoading && <Spinner />}
      {!isLoading && !patientList && <Empty resourceName="No Check Ins" />}

      {!isLoading && patientList && patientList.length > 0 && (
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
              <div className={styles.headerColumns}>Check In Status</div>
              <div className={styles.headerColumns}></div>
            </header>
            {patientList.map((patient) => (
              <HospitalAppointmentList
                key={patient.id}
                patient={patient}
                tab="Desktop"
              />
            ))}
          </div>
          <div className={styles.mobileNav}>
            {patientList.map((patient) => (
              <HospitalAppointmentList
                key={patient.id}
                patient={patient}
                tab="Mobile"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HospitalDashboard;
