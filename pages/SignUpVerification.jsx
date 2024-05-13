import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { MdMail, MdOutlineMarkEmailRead } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";

import styles from "../src/styles/SignUpVerification.module.css";

import { resubmitVerificationEmail } from "../src/services/login.service";

import ResendVerification from "./ResendVerification";
import Spinner from "./Spinner";

function SignUpVerification() {
  const navigate = useNavigate();
  const { action } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: resubmitVerificationEmail,
    onSuccess: () => {
      navigate("/app/verifyEmail");
    },
    onerror: () => {
      console.log("first");
    },
  });

  function resendEmail(email) {
    setIsOpenModal(false);
    mutate(email);
  }

  return (
    <>
      <div className={styles.mainDiv}>
        {isOpenModal && (
          <ResendVerification
            onClose={() => setIsOpenModal(false)}
            btnClick={(email) => resendEmail(email)}
          ></ResendVerification>
        )}

        <div className={styles.rightDiv}>
          <img className={styles.img} alt="logo" src="7.png" />
        </div>
        {isPending && <Spinner />}
        {action === "verifyEmail" && (
          <div className={styles.leftDiv}>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              We&apos;ve sent you a confirmation email
            </p>
            <p>Time to check your email</p>
            <MdMail size={150} style={{ marginTop: "5em" }} />
            <p>Click the link in your email to confirm your account</p>
            <p>
              If you can find the email check the spam or promotional folder
            </p>

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
              Please use the link below to login to your accountur account is
              now active.
            </p>
            <button className={styles.btn} onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        )}

        {action === "verifiedAccount" && (
          <div className={styles.leftDiv}>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              Account already verified !!!
            </p>

            <MdOutlineMarkEmailRead size={150} style={{ marginTop: "3em" }} />
            <p>Thank you. Your Account has already been verified.</p>
            <p>No further action is required.</p>
            <button className={styles.btn} onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        )}

        {action === "verificationFailed" && (
          <div className={styles.leftDiv}>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              Unfortunately your account could not be verified !!!
            </p>

            <MdOutlineMarkEmailRead size={150} style={{ marginTop: "3em" }} />
            <p>The Email verification link you clicked in invalid</p>
            <p>Please resend verification Link</p>
            <button
              className={styles.btn}
              style={{ marginRight: "1em" }}
              onClick={() => setIsOpenModal(true)}
            >
              Resend
            </button>
            <button className={styles.btn} onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SignUpVerification;
