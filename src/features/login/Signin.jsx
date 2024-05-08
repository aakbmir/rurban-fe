import styles from "../../styles/Signin.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../services/login.service";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import FormRow from "../common/FormRow";
import { useAuth } from "../../context/AuthContext";

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { errors } = formState;
  const { mutateAsync, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      if (data.status === 200) {
        localStorage.setItem("rurban_cro_nm_ddn", data.data.details.name);
        localStorage.setItem("rurban_cro_id_ddi", data.data.details.id);
        localStorage.setItem("rurban_reg_type_unit", data.data.registerType);
        login();
        if (localStorage.getItem("rurban_reg_type_unit") === "Patient") {
          navigate("/locationAccess");
        } else {
          navigate("/dashboard/er/home?tab=patientList");
        }
      } else if (data.status === 401) {
        toast.error("Invalid Credentials!!", {
          position: "bottom-center",
        });
      } else if (data.status === 404) {
        toast.error("User does not exist!!", {
          position: "bottom-center",
        });
      } else {
        toast.error("Error while logging in !!", {
          position: "bottom-center",
        });
      }
    },
    onError: () => {
      toast.error("Invalid Credentials!!", {
        position: "bottom-center",
      });
    },
  });

  async function onSubmit(data) {
    await mutateAsync(data);
  }

  function onError(error) {
    console.log("error", error);
  }

  return (
    <div className={styles.mainsection}>
      <div className={styles.leftdiv}>
        <img alt="logo" className={styles.logoimg} src="/1.png" />
        <div className={styles.brandnamediv}>
          <span className={styles.brandname}>Rurban</span>
          <p></p>
          <span className={styles.logintext}>
            Please fill your details to access your account.
          </span>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormRow label="Email" error={errors?.username?.message}>
              <div
                className={`${
                  errors?.username?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                } ${styles.formrowdiv}`}
              >
                <p></p>
                <input
                  className={styles.input}
                  placeholder="abc@xxx.com"
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "This field is required",
                    minLength: {
                      value: 5,
                      message: "min characters allowed: 4",
                    },
                  })}
                ></input>
              </div>
            </FormRow>
            <FormRow label="Password" error={errors?.password?.message}>
              <div
                className={`${
                  errors?.passwword?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                } ${styles.formrowdiv}`}
              >
                <p></p>
                <input
                  className={styles.input}
                  placeholder="......"
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                ></input>
                <button
                  className={styles.transparentButton}
                  type="button"
                  onClick={() => setShowPassword((pre) => !pre)}
                >
                  {!showPassword && <FaEyeSlash color="#667085" />}
                  {showPassword && <FaEye color="#667085" />}
                </button>
              </div>
            </FormRow>

            <button
              disabled={isPending}
              className={`${styles.btnUser} ${
                isPending ? styles.disabledBtn : ""
              }`}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
            <div className={styles.register}>
              <span>
                Don&apos;t have an account?
                <button
                  onClick={() => navigate("/")}
                  className={styles.homeBtn}
                >
                  Sign up
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.rightdiv}>
        <img
          alt="home"
          src="https://thumbs.dreamstime.com/b/double-exposure-smart-medical-doctor-working-operating-room-as-concept-43619820.jpg"
        ></img>
      </div>
    </div>
  );
}

export default Signin;
