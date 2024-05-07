import DashboardNavbar from "../common/DashboardNavbar";
import UserAppointments from "./UserAppointments";
import HospitalsList from "./HospitalsList";

function UserDashboard() {
  return (
    <>
      <DashboardNavbar user="patient" />
      <UserAppointments records={1} />
      <HospitalsList />
    </>
  );
}

export default UserDashboard;
