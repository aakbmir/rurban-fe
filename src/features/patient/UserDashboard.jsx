import DashboardNavbar from "../common/DashboardNavbar";
import UserAppointments from "./UserAppointments";
import HospitalsList from "./HospitalsList";

function UserDashboard() {
  return (
    <div>
      <DashboardNavbar feature="Hospitals" />
      <UserAppointments records={1} />
      <HospitalsList />
    </div>
  );
}

export default UserDashboard;
