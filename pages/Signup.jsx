import Navbar from "../src/components/AccessNavbar";
import styles from "./Signup.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegisterEr, RegisterUser } from "../src/services/login.service";
import { useGeoLocation } from "../src/hooks/useGeoLocation";
import { useUrlPosition } from "../src/hooks/useUrlPosition";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { toast } from "react-toastify";

function Signin() {
  const { pathname } = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const userType = pathname === "/signup/er" ? "Hospital" : "Patient";

  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState, setValue } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { errors } = formState;

  const { mutate } = useMutation({
    mutationFn: userType === "Hospital" ? RegisterEr : RegisterUser,
    onSuccess: () => {
      toast.success(
        `${
          userType === "Hospital"
            ? "ER Successfully Registered"
            : "User Successfully Registered"
        } `,
        {
          position: "bottom-center",
        }
      );
      localStorage.setItem("username", "Aaqib");
      navigate("/signin");
    },
    onError: (e) => {
      alert(e);
      alert("error while logging in");
    },
  });

  function onSubmit(data) {
    data["registerType"] = userType;
    mutate(data);
  }

  function onError(error) {
    console.log("error", error);
  }

  const { position: geoLocationPosition, getPosition } = useGeoLocation();
  const [position, setPosition] = useState(null);
  const [lat, lng] = useUrlPosition();

  function getPositionValue() {
    getPosition();
    setPosition(`${lat}, ${lng}`);
    setValue("location", position);
  }

  useEffect(() => {
    if (lat && lng) {
      setPosition(`${lat}, ${lng}`);
    }
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
          <img className={styles.heroimage1} src="/l1.png" alt="background" />
        </div>
        <div className={styles.formsection}>
          {/* <button className={styles.imgBtn} onClick={() => navigate("/")}>
            <img className={styles.logoImg} alt="hello" src="/l1.png"></img>
          </button> */}
          <div className={styles.textdescription}>
            <h1>Register Yourself</h1>
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
                  errors?.contact?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  placeholder="Contact Number"
                  className={styles.inputVal}
                  type="text"
                  id="contact"
                  {...register("contact", {
                    required: "This field is required",
                    minLength: {
                      value: 10,
                      message: "Invalid contact Number",
                    },
                    maxLength: {
                      value: 10,
                      message: "Invalid contact Number",
                    },
                  })}
                ></input>
              </fieldset>

              {errors?.contact?.message && (
                <span className={styles.errorMessage}>
                  {errors?.contact?.message}
                </span>
              )}
              {userType === "Clinic" && (
                <>
                  <fieldset
                    className={
                      errors?.website?.message
                        ? styles.errorFieldset
                        : styles.inputFieldset
                    }
                  >
                    <input
                      placeholder="website"
                      className={styles.inputVal}
                      type="text"
                      id="website"
                      {...register("website", {
                        required: "This field is required",
                        minLength: {
                          value: 10,
                          message: "Invalid website ",
                        },
                        maxLength: {
                          value: 10,
                          message: "Invalid website Number",
                        },
                      })}
                    ></input>
                  </fieldset>

                  {errors?.website?.message && (
                    <span className={styles.errorMessage}>
                      {errors?.website?.message}
                    </span>
                  )}
                </>
              )}
              <fieldset
                className={
                  errors?.location?.message
                    ? styles.errorFieldset
                    : styles.inputFieldset
                }
              >
                <input
                  disabled={true}
                  placeholder="Location"
                  className={styles.inputVal}
                  type="text"
                  id="location"
                  {...register("location", {
                    required: "This field is required",
                  })}
                ></input>
                <button
                  style={{ background: "none", border: "none" }}
                  type="button"
                  onClick={() => getPositionValue()}
                >
                  <FaLocationCrosshairs
                    color="#666464"
                    className={styles.searchIcon}
                  />
                </button>
              </fieldset>

              {errors?.location?.message && (
                <span className={styles.errorMessage}>
                  {errors?.location?.message}
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
                  type={`${showPassword ? "text" : "password"}`}
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

              <button className={styles.btnUser}>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
