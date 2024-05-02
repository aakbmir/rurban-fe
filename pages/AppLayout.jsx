import { Route, Routes } from "react-router-dom";
import Dashboard from "../src/features/common/Dashboard";
import UserAppointments from "../src/features/patient/UserAppointments";
import DashboardNavbar from "../src/features/common/DashboardNavbar";
import HospitalsList from "../src/features/patient/HospitalsList";

export default function AppLayout() {
  console.log("In AppLayout");
  return (
    <>
      <Routes>
        <Route path=":user/home" element={<Dashboard />} />
        <Route
          path=":user/hospitals"
          element={
            <>
              <DashboardNavbar feature="Patients" />
              <HospitalsList records="all" />
            </>
          }
        />
        <Route
          path=":user/checkIns"
          element={
            <>
              <DashboardNavbar feature="Patients" />
              <UserAppointments records="all" />
            </>
          }
        />
      </Routes>
    </>
  );
}
