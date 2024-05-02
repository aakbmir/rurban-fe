import Styles from "./Dashboard.module.css";
import { useParams } from "react-router-dom";
import UserDashboard from "../patient/UserDashboard";
import HospitalDashboard from "../hospital/HospitalDashboard";

function Dashboard() {
  console.log("In Dashboard");
  let { user } = useParams();
  return (
    <div className={Styles.app}>
      {user === "user" && <UserDashboard />}
      {user === "er" && <HospitalDashboard />}
    </div>
  );
}

export default Dashboard;
