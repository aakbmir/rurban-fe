import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import styles from "./HospitalsList.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { createCheckIn } from "../../services/data.service";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useEffect, useState } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHospitalQuery } from "../../custom/useHospitalQuery";
import Spinner from "../common/Spinner";
import Empty from "../../ui/Empty";

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
      return null;
    } else {
      console.log("");
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
    onSuccess: () => {
      toast.success("Appointment successfully Booked");
      queryClient.invalidateQueries({ queryKey: ["UserCheckIns"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <div className={styles.navTabName}>Hospitals</div>;
      {isHospitalLoading ? (
        <Spinner />
      ) : !hospitals || hospitals.length === 0 ? (
        <Empty resourceName="Hospitals" />
      ) : (
        <>
          <div className={styles.mobileNav}>
            <div className={styles.cardContainer}>
              {hospitals.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.firstDiv}>
                    <div className={styles.firstLeftSection}>
                      <img
                        alt="hospital"
                        className={styles.imgImage}
                        src={hosImage}
                      ></img>
                    </div>
                    <div>
                      <h2>{item.clinicName}</h2>
                      {item.clinicContact ? (
                        <p className={styles.phone}>
                          <FaPhoneAlt className={styles.icon} />
                          {item.clinicContact}
                        </p>
                      ) : (
                        <p className={styles.phone}>
                          <FaPhoneAlt className={styles.icon} />
                          Not Available
                        </p>
                      )}
                      {item.clinicWebsite && (
                        <p>
                          <FaLocationDot className={styles.icon} />
                          {item.clinicWebsite}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.firstDiv} style={{ marginTop: "1em" }}>
                    <div className={styles.firstLeftSectionButtonGroup}>
                      <button
                        onClick={() => getDirections(item.clinicLocation)}
                        style={{
                          marginRight: "1em",
                          padding: "0.5em",
                          background: "#1a8efd",
                          border: "1px solid grey",
                          borderRadius: "6px",
                          color: "white",
                        }}
                        disabled={isPending}
                      >
                        <FaLocationArrow style={{ marginRight: "1em" }} />
                        Get Directions
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleAppointments(item)}
                        style={{
                          marginRight: "1em",

                          padding: "0.5em",
                          background: "#1a8efd",
                          border: "1px solid grey",
                          borderRadius: "6px",
                          color: "white",
                        }}
                        disabled={isPending}
                      >
                        Check In
                      </button>
                    </div>
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
                  <div></div>
                </header>

                {hospitals.map((item, index) => (
                  <div role="row" key={item.id} className={styles.tableData}>
                    <div className={styles.tableColumn}>{item.clinicName}</div>
                    <div className={styles.tableColumn}>
                      {item.clinicContact}
                    </div>
                    <div className={styles.tableColumn}>
                      {item.clinicWebsite}
                    </div>
                    <div className={styles.tableColumn}>
                      <button
                        style={{
                          marginRight: "1em",
                          padding: "0.5em",
                          background: "#1a8efd",
                          border: "none",
                          borderRadius: "6px",
                          color: "white",
                        }}
                        onClick={() => getDirections(item.clinicLocation)}
                      >
                        <FaLocationArrow style={{ marginRight: "1em" }} />
                        Get Directions
                      </button>
                    </div>
                    <div className={styles.tableColumn}>
                      <div style={{ marginLeft: "3em" }}>
                        <button
                          onClick={() => handleAppointments(item)}
                          style={{
                            marginRight: "1em",
                            padding: "0.5em",
                            background: "#1a8efd",
                            border: "none",
                            borderRadius: "6px",
                            color: "white",
                          }}
                          disabled={isPending}
                        >
                          Check In
                        </button>
                      </div>
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
