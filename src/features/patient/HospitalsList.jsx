import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import styles from "../../styles/HospitalsList.module.css";
import { createCheckIn } from "../../services/data.service";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useEffect, useState } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHospitalQuery } from "../../hooks/useHospitalQuery";
import Spinner from "../../../pages/Spinner";
import Empty from "../../../pages/Empty";

const hosImage =
  "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo=";
// const patImage =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJmKSOQnjXM11pZ3TAzFEb88iy2fouGn-CI-1JI3ffQ&s";

const HospitalsList = () => {
  const { isHospitalLoading, hospitals } = useHospitalQuery();

  const { position: geoLocationPosition, getPosition } = useGeoLocation();
  const [position, setPosition] = useState(null);
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      setPosition((prev) => [lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setPosition((prev) => [geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  function handleAppointments(item) {
    if (!position) {
      toast.error("location Access is required");
      getPosition();
      return;
    }

    toast.success("CheckIn in progress");
    const newCheckIn = {
      position: position.toString(),
      patientId: localStorage.getItem("rurban_cro_id_ddi"),
      clinicId: item.id,
    };
    mutateAsync(newCheckIn);
  }

  function getDirections(clinicLocation) {
    const lat = clinicLocation.split(",")[0];
    const lng = clinicLocation.split(",")[1];
    if (lat && lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, "_blank");
    } else {
      toast.error("Could not open directions");
    }
  }

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCheckIn,
    onSuccess: (data) => {
      toast.success("Appointment successfully Booked");
      queryClient.invalidateQueries({ queryKey: ["UserUpcomingCheckIns"] });
    },
    onError: (err) => {
      if (err.toString().includes("409")) {
        toast.error("There is already an open check In");
      } else {
        toast.error(err.message);
      }
    },
  });

  return (
    <>
      <div className={styles.navTabName}>Available Hospitals</div>;
      {isHospitalLoading ? (
        <Spinner />
      ) : !hospitals.data || hospitals.data.length === 0 ? (
        <Empty resourceName="Hospitals" />
      ) : (
        <>
          <div className={styles.mobileNav}>
            <div className={styles.cardContainer}>
              {hospitals.data.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.firstDiv}>
                    <div className={styles.firstLeftSection}>
                      <img
                        alt="hospital"
                        className={styles.imgImage}
                        src={hosImage}
                      ></img>
                    </div>
                    <div className={styles.firstRightSection}>
                      <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {item.clinicName}
                      </span>
                      {item.clinicContact ? (
                        <p className={styles.phone}>
                          <FaPhoneAlt className={styles.icon} />
                          {item.clinicContact}
                          <button
                            style={{
                              background: "none",
                              border: "1px solid grey",
                              float: "right",
                              padding: "0.3em",
                              borderRadius: "1em",
                              fontSize: "10px",
                            }}
                          >
                            4.5 Kms
                          </button>
                        </p>
                      ) : (
                        <p className={styles.phone}>
                          <FaPhoneAlt className={styles.icon} />
                          Not Available
                        </p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className={styles.firstDiv} style={{ marginTop: "1em" }}>
                    <div>
                      <FaLocationArrow style={{ marginRight: "1em" }} />
                      {item.clinicAddress}
                    </div>
                  </div>

                  <div
                    className={styles.firstDiv}
                    style={{
                      marginTop: "1em",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className={`${styles.checkinBtn} ${
                        isPending ? styles.disabledBtn : ""
                      }`}
                      onClick={() => handleAppointments(item)}
                      disabled={isPending}
                    >
                      Check In
                    </button>
                    <button
                      className={styles.directionBtn}
                      onClick={() => getDirections(item.clinicLocation)}
                      disabled={isPending}
                    >
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.desktopNav}>
            <div className={styles.cardContainer}>
              <div
                role="table"
                className={`${styles.desktopNav} ${styles.table}`}
              >
                <header role="row" className={styles.header}>
                  <div>Name</div>
                  <div>Contact</div>
                  <div>Website</div>
                  <div>Location</div>
                  <div>Action</div>
                </header>

                {hospitals.data.map((item, index) => (
                  <div role="row" key={item.id} className={styles.tableData}>
                    <div className={styles.tableColumn}>{item.clinicName}</div>
                    <div className={styles.tableColumn}>
                      {item.clinicContact}
                    </div>
                    <div className={styles.tableColumn}>
                      {item.clinicWebsite}
                    </div>
                    <div className={styles.tableColumn}>
                      {item.clinicAddress}
                    </div>{" "}
                    <div className={styles.tableColumn}>
                      <button
                        className={styles.directionBtn}
                        onClick={() => getDirections(item.clinicLocation)}
                      >
                        <FaLocationArrow style={{ marginRight: "1em" }} />
                        Directions
                      </button>

                      <button
                        className={styles.checkinBtn}
                        onClick={() => handleAppointments(item)}
                        disabled={isPending}
                      >
                        Check In
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HospitalsList;
