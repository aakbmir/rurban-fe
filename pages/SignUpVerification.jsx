import { useNavigate, useParams } from "react-router-dom";
import styles from "../src/styles/SignUpVerification.module.css";
import { MdMail } from "react-icons/md";

function SignUpVerification() {
  const navigate = useNavigate();
  const { action } = useParams();
  console.log(action);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.rightDiv}>
        <img className={styles.img} alt="logo" src="7.png" />
      </div>
      {action === "verifyEmail" && (
        <div className={styles.leftDiv}>
          <p style={{ fontSize: "18px", fontWeight: "500" }}>
            We&apos;ve sent you a confirmation email
          </p>
          <p>Time to check your email</p>
          <MdMail size={150} style={{ marginTop: "5em" }} />
          <p>Click the link in your email to confirm your account</p>
          <p>If you can find the email check the spam or promotional folder</p>

          <button className={styles.btn} onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      )}

      {action === "emailverified" && (
        <div className={styles.leftDiv}>
          <p style={{ fontSize: "18px", fontWeight: "500" }}>
            Account Activated !!!
          </p>

          <MdMail size={150} style={{ marginTop: "3em" }} />
          <p>Thank you. Your Email has been successfully verified.</p>
          <p>Your account is now active.</p>
          <p>
            Please use the link below to login to your accountur account is now
            active.
          </p>
          <button className={styles.btn} onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUpVerification;
