import DashboardNavbar from "../common/DashboardNavbar";
import HospitalAppointmentList from "./HospitalPastCheckIns";
import HospitalUpcomingCheckIns from "./HospitalUpcomingCheckIns";

function HospitalDashboard() {
  return (
    <>
      <DashboardNavbar user="hospital" />
      <HospitalUpcomingCheckIns />
      <HospitalAppointmentList />
    </>
  );
}

export default HospitalDashboard;
