import Navbar from "../src/components/AccessNavbar";
import styles from "./Signup.module.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { userLogin } from "../src/services/login.service";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userLogin, userRegister } from "../src/services/login.service";
import { IoIosArrowBack } from "react-icons/io";
import Map from "../src/components/Map";
import { useGeoLocation } from "../src/hooks/useGeoLocation";
import { useUrlPosition } from "../src/hooks/useUrlPosition";
import Button from "../src/components/Button";

function Signin() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [userType, setUserType] = useState(
    pathname === "/signup/er" ? "Hospital" : "Patient"
  );

  const navigate = useNavigate();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const { errors } = formState;

  const { mutate } = useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      setIsOpen(true);
      localStorage.setItem("username", "Aaqib");
      navigate("/signin");
    },
    onError: () => {
      alert("error while logging in");
    },
  });

  function onSubmit(data) {
    data["registerType"] = userType;
    console.log(position);
    data["position"] = position;
    mutate(data);
  }

  function onError(error) {
    console.log("error", error);
  }

  const {
    position: geoLocationPosition,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeoLocation();

  const [position, setPosition] = useState(null);

  console.log(position);
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      setPosition(`${lat}, ${lng}`);
    }
    getPosition();
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setPosition(`${geoLocationPosition.lat}, ${geoLocationPosition.lng}`);
    }
  }, [geoLocationPosition]);

  return (
    <>
      <Navbar title="Register Account" />

      <div className={styles.herosection}>
        <div className={styles.heroimagesection}>
          <img className={styles.heroimage1} src="l1.png" alt="background" />
        </div>
        <div className={styles.formsection}>
          <button className={styles.imgBtn} onClick={() => navigate("/")}>
            <img className={styles.logoImg} alt="hello" src="/l1.png"></img>
          </button>
          <div className={styles.textdescription}>
            <h3>Register Yourself</h3>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <fieldset
                className={
                  errors?.name?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  className={styles.inputVal}
                  placeholder={
                    userType === "Patient" ? "Full Name" : "Hospital Name"
                  }
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "This field is required",
                    minLength: {
                      value: 5,
                      message: "min characters allowed: 4",
                    },
                  })}
                ></input>
              </fieldset>

              {errors?.name?.message && (
                <span className={styles.errorMessage}>
                  {errors?.name?.message}
                </span>
              )}

              {userType === "Patient" && (
                <>
                  <fieldset
                    className={
                      errors?.dob?.message
                        ? styles.errorFieldset
                        : styles.inputFieldset
                    }
                  >
                    <input
                      placeholder="Date of Birth"
                      className={styles.inputVal}
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "date")}
                      id="dob"
                      {...register("dob", {
                        required: "This field is required",
                      })}
                    ></input>
                  </fieldset>

                  {errors?.dob?.message && (
                    <span className={styles.errorMessage}>
                      {errors?.dob?.message}
                    </span>
                  )}
                </>
              )}

              <fieldset
                className={
                  errors?.email?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  placeholder="Email"
                  className={styles.inputVal}
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                ></input>
              </fieldset>

              {errors?.email?.message && (
                <span className={styles.errorMessage}>
                  {errors?.email?.message}
                </span>
              )}

              <fieldset
                className={
                  errors?.phone?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  placeholder="Phone"
                  className={styles.inputVal}
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "This field is required",
                    minLength: {
                      value: 10,
                      message: "Invalid Phone Number",
                    },
                    maxLength: {
                      value: 10,
                      message: "Invalid Phone Number",
                    },
                  })}
                ></input>
              </fieldset>

              {errors?.phone?.message && (
                <span className={styles.errorMessage}>
                  {errors?.phone?.message}
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
                  placeholder="Password"
                  className={styles.inputVal}
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/,
                      message: "Invalid Password",
                    },
                  })}
                ></input>
              </fieldset>

              {errors?.password?.message && (
                <>
                  <p className={styles.errorMessage}>
                    {errors?.password?.message}
                  </p>
                  <button
                    style={{
                      padding: "0.3em",
                      background: "transparent",
                      color: "green",
                      fontStyle: "italic",
                      border: "none",
                    }}
                    type="button"
                    onClick={() => setIsHintOpen((prevState) => !prevState)}
                  >
                    {isHintOpen
                      ? "Close Password Pattern"
                      : "Click to view Password Pattern"}
                  </button>
                </>
              )}

              {isHintOpen && (
                <div className={styles.passwordPattern}>
                  <ul style={{ color: "black" }}>
                    <li>Must be atleast 8 characters long</li>
                    <li>Must contain at least one lowercase letter</li>
                    <li>Must contain at least one uppercase letter</li>
                    <li>Must contain at least one digit</li>
                    <li>Must contain at least one special Character</li>
                  </ul>
                </div>
              )}

              <fieldset
                className={
                  errors?.confirmPassword?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  placeholder="Confirm password"
                  className={styles.inputVal}
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "This field is required",
                    validate: (value) =>
                      value === getValues().password ||
                      "Passwords do not match",
                  })}
                ></input>
              </fieldset>

              {errors?.confirmPassword?.message && (
                <span className={styles.errorMessage}>
                  {errors?.confirmPassword?.message}
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
