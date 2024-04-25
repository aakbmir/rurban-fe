import Navbar from "../src/components/AccessNavbar";
import styles from "./Signin.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../src/services/login.service";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const { errors } = formState;

  const { mutateAsync } = useMutation({
    mutationFn: userLogin,
    // onSettled: (responseData, error) => {
    //   // Check if there was an error
    //   if (error) {
    //     // Handle error
    //     alert("Invalid Credentials");
    //   } else if (responseData) {
    //     // Access the response data and do something with it
    //     console.log('Response data:', responseData);
    //     // You can also update state or perform any other action here
    //   } else {
    //     console.error('Response data is undefined');
    //   }
    //  },

    onSuccess: (data) => {
      console.log("dataaaa", data);
      localStorage.setItem("username", data.username);
      toast.success("Login Successful!!", {
        position: "bottom-center",
      });
      if (data.registerType === "Patient") {
        navigate("/dashboard?user=patient");
      } else {
        navigate("/dashboard?user=er");
      }
    },
    onError: () => {
      alert("Invalid Credentials");
    },
  });

  async function onSubmit(data) {
    await mutateAsync(data);
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
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                ></input>
                <button
                  style={{ background: "none", border: "none" }}
                  type="button"
                  onClick={() => setShowPassword((pre) => !pre)}
                >
                  {!showPassword && (
                    <FaEyeSlash color="#666464" className={styles.searchIcon} />
                  )}
                  {showPassword && (
                    <FaEye color="#666464" className={styles.searchIcon} />
                  )}
                </button>
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
