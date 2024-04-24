import { useSearchParams } from "react-router-dom";
import Styles from "./AppLayout.module.css";
import HospitalDashboard from "../src/components/HospitalDashboard";
import UserDashboard from "../src/components/UserDashboard";

export default function AppLayout() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");
  console.log(user);
  return (
    <div className={Styles.app}>
      {user === "patient" && <UserDashboard />}
      {user === "er" && <HospitalDashboard />}
    </div>
  );
}
