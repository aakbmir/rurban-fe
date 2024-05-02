import styles from "./Signup.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegisterEr, RegisterUser } from "../../services/login.service";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import {
  FaCheckDouble,
  FaEye,
  FaEyeSlash,
  FaLocationArrow,
} from "react-icons/fa";
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

  const { mutate, isPending } = useMutation({
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
      navigate("/");
    },
    onError: (error) => {
      //alert(error.message);
      toast.error(error.message, { position: "bottom-center" });
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

  useEffect(() => {
    if (lat && lng) {
      setPosition((prev) => [lat, lng]);
      setValue("location", [lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setPosition((prev) => [geoLocationPosition.lat, geoLocationPosition.lng]);
      setValue("location", [geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition, setValue]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.leftSectionDiv}>
        <img className={styles.leftDivLogo} src="/1.png" alt="background" />
      </div>
      <div className={styles.formSection}>
        <img className={styles.logoImg} alt="hello" src="/1.png"></img>
        <div className={styles.textDescription}>
          <h3>Create a new Account</h3>
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
            <div className={styles.locationError}>
              {errors?.name?.message && (
                <span className={styles.errorMessage}>
                  {errors?.name?.message}
                </span>
              )}
            </div>
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

                <div className={styles.locationError}>
                  {errors?.dob?.message && (
                    <span className={styles.errorMessage}>
                      {errors?.dob?.message}
                    </span>
                  )}
                </div>
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

            <div className={styles.locationError}>
              {errors?.email?.message && (
                <span className={styles.errorMessage}>
                  {errors?.email?.message}
                </span>
              )}
            </div>
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

            <div className={styles.locationError}>
              {errors?.contact?.message && (
                <span className={styles.errorMessage}>
                  {errors?.contact?.message}
                </span>
              )}
            </div>
            {userType === "Hospital" && (
              <>
                <fieldset
                  className={
                    errors?.website?.message
                      ? styles.errorFieldset
                      : styles.inputFieldset
                  }
                >
                  <input
                    placeholder="Website"
                    className={styles.inputVal}
                    type="text"
                    id="website"
                    {...register("website")}
                  ></input>
                </fieldset>

                <div className={styles.locationError}>
                  {errors?.website?.message && (
                    <span className={styles.errorMessage}>
                      {errors?.website?.message}
                    </span>
                  )}
                </div>
              </>
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
                className={styles.transparentButton}
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

            <div className={styles.locationError}>
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
            </div>
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
                placeholder="Confirm Password"
                className={styles.inputVal}
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Passwords do not match",
                })}
              ></input>
            </fieldset>

            <div className={styles.locationError}>
              {errors?.confirmPassword?.message && (
                <span className={styles.errorMessage}>
                  {errors?.confirmPassword?.message}
                </span>
              )}
            </div>
            {userType === "Hospital" ? (
              <>
                <div style={{ display: "none" }}>
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
                        required: "Location Access is required",
                      })}
                    ></input>
                  </fieldset>
                </div>
                {position ? (
                  <p className={styles.position}>
                    <FaCheckDouble size={15} style={{ marginRight: "0.7em" }} />
                    Location Saved
                  </p>
                ) : (
                  <button
                    type="button"
                    className={styles.position}
                    onClick={getPosition}
                  >
                    <FaLocationArrow
                      size={15}
                      style={{ marginRight: "0.7em" }}
                    />
                    Use My location
                  </button>
                )}
                <div className={styles.locationError}>
                  {errors?.location?.message && (
                    <span className={styles.errorMessage}>
                      {errors?.location?.message}
                    </span>
                  )}
                </div>
              </>
            ) : (
              ""
            )}

            <button
              disabled={isPending}
              className={`${styles.btnUser} ${
                isPending ? styles.disabledBtn : ""
              }`}
            >
              {isPending ? "Signing up..." : "Sign up"}
            </button>
            <div className={styles.mobileLogin}>
              <span className={styles.register}>
                Already have an account?
                <button
                  onClick={() => navigate("/")}
                  className={styles.homeBtn}
                >
                  Sign In
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
