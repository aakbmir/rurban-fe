import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserAppointments from "./../patient/UserAppointments";
import DashboardNavbar from "./DashboardNavbar";
import HospitalsList from "../patient/HospitalsList";
import PageNotFound from "./PageNotFound";

export default function AppLayout() {
  return (
    <>
      <Routes>
        <Route path=":user/home" element={<Dashboard />} />
        <Route
          path=":user/hospitals"
          element={
            <>
              <DashboardNavbar user="patient" />
              <HospitalsList records="all" />
            </>
          }
        />
        <Route
          path=":user/checkIns"
          element={
            <>
              <DashboardNavbar user="patient" />
              <UserAppointments records="all" />
            </>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
