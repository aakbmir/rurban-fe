import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { TbHospital } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div className={styles.herosection}>
      <div className={styles.heroimagesection}>
        <img className={styles.heroimage1} src="l1.png" alt="Doctor" />
        <p className={styles.textdescritpion}>
          Talk to online doctors and get medical advice, online prescriptions,
          refills and medical notes within minutes. On-demand healthcare
          services at your fingertips.
        </p>
      </div>
      <div className={styles.textsection}>
        <img className={styles.logoImg} alt="hello" src="l1.png"></img>
        <div className={styles.container}>
          <h1>Get started!</h1>
          <div className={styles.btnGroup}>
            <button
              className={styles.btnSignin}
              onClick={() => navigate("signin")}
            >
              <FaUserAlt
                size={20}
                style={{ height: "1.2em", marginRight: "1em" }}
              />
              Sign In
            </button>
          </div>
          <p className={styles.registerText}>Don&apos;t have an account?</p>
          <div className={styles.btnGroup}>
            <button
              className={styles.btnSignUpPatient}
              onClick={() => navigate("signup/user")}
            >
              <FaUserAlt size={20} style={{ marginRight: "1em" }} />
              Patient Sign Up
            </button>
          </div>
          <div className={styles.btnGroup}>
            <button
              className={styles.btnSignUpPatient}
              onClick={() => navigate("signup/er")}
            >
              <TbHospital size={20} style={{ marginRight: "1em" }} />
              ER Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
