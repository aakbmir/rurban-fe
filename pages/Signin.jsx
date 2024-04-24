import Navbar from "../src/components/AccessNavbar";
import styles from "./Signin.module.css";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { userLogin } from "../src/services/login.service";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../src/services/login.service";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

function Signin() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const { errors } = formState;

  const { mutate } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      setIsOpen(true);
      localStorage.setItem("username", "Aaqib");
      // toast.success("User logged successfully!", {
      //   position: "top-center",
      // });
      if (data.registerType === "Patient") {
        navigate("/dashboard?user=patient");
      } else {
        navigate("/dashboard?user=er");
      }
    },
    onError: () => {
      alert("error while logging in");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  function onError(error) {
    console.log("error", error);
  }

  return (
    <>
      <Navbar title="Sign in" />

      <div className={styles.herosection}>
        <div className={styles.heroimagesection}>
          <img className={styles.heroimage1} src="l1.png" alt="background" />
        </div>
        <div className={styles.formsection}>
          <button className={styles.imgBtn} onClick={() => navigate("/")}>
            <img className={styles.logoImg} alt="hello" src="l1.png"></img>
          </button>
          <div className={styles.textdescription}>
            <h5>Welcome back! Log in to your account</h5>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <fieldset
                className={
                  errors?.username?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  className={styles.inputVal}
                  placeholder="Username or phone number"
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
              </fieldset>

              {errors?.username?.message && (
                <span className={styles.errorMessage}>
                  {errors?.username?.message}
                </span>
              )}
              <fieldset
                className={
                  errors?.password?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  className={styles.inputVal}
                  placeholder="Password"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                ></input>
              </fieldset>

              {errors?.password?.message && (
                <span className={styles.errorMessage}>
                  {errors?.password?.message}
                </span>
              )}

              <button className={styles.btnUser}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
