import { MdMyLocation } from "react-icons/md";
import { FaCalendar, FaClock, FaLocationArrow } from "react-icons/fa";
import styles from "../../styles/UserAppointments.module.css";
import {
  formatDate,
  formatDay,
  formatFullDate,
  showTime,
} from "../../utils/Helper";
import { cancelCheckIn } from "../../services/data.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { GiCancel } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useUserCheckInQuery } from "../../hooks/useUserCheckInQuery";
import Spinner from "../common/Spinner";
import Empty from "../common/Empty";
import ModalMain from "../common/ModalMain";

const API_KEY = "5b3ce3597851110001cf62485841300cbc6947e0ae08e8fa3c83c194";

function UserAppointments({ records }) {
  const { isLoading, isCheckInLoading, checkIns } =
    useUserCheckInQuery(records);

  const [currentItem, setCurrentItem] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: cancelCheckIn,
    onSuccess: () => {
      toast.success("Check In Cancelled!");
      queryClient.invalidateQueries(["UserCheckIns"]);
    },
  });

  const [bookingDistances, setBookingDistances] = useState([]);
  useEffect(() => {
    const calculateDistances = async () => {
      if (checkIns) {
        const distances = await Promise.all(
          checkIns.map((booking) =>
            calculateDistance(
              booking.patientLocation.split(",")[0],
              booking.patientLocation.split(",")[1],
              booking.clinicId.clinicLocation.split(",")[0],
              booking.clinicId.clinicLocation.split(",")[1]
            )
          )
        );
        setBookingDistances(distances);
      }
    };

    calculateDistances();
  }, [checkIns]);

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

  async function calculateDistance(itemLat, itemLng, clinicLat, clinicLng) {
    try {
      if (itemLat && itemLng && clinicLat && clinicLng) {
        const origin = `${itemLng},${itemLat}`;
        const destination = `${clinicLng},${clinicLat}`;

        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin}&end=${destination}`
        );
        const data = await response.json();
        if (data?.features) {
          return {
            distance: data.features[0].properties.summary.distance,
            duration: Math.floor(
              data.features[0].properties.summary.duration / 60
            ),
          };
        }
      }
    } catch (error) {
      console.error("Failed to calculate distance:", error);
      return null;
    }
  }

  const [isOpenModal, setIsOpenModal] = useState(false);
  function cancelAppointment(item) {
    setCurrentItem((s) => item);
    setIsOpenModal(true);
  }

  function confirmCancellation(item) {
    mutateAsync(item.id);
    toast.success("cancellation in progress");
    setCurrentItem(null);
    setIsOpenModal(false);
  }

  return (
    <>
      <div className={styles.navTabName}>Check In</div>
      {isOpenModal && (
        <ModalMain
          onClose={() => setIsOpenModal(false)}
          onSubmit={() => confirmCancellation(currentItem)}
          cancel="Close"
          submit="Confirm"
        >
          <h3>Are you sure you want to cancel the check in?</h3>
        </ModalMain>
      )}
      {isCheckInLoading && isLoading ? (
        <Spinner />
      ) : !checkIns || checkIns.length === 0 ? (
        <Empty resourceName="Upcoming Check In" />
      ) : (
        <>
          <div className={styles.mobileNav}>
            <div className={styles.cardContainer}>
              {checkIns.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.appointmentdiv}>
                    <div
                      style={{
                        display: "flex",
                        borderRight: "1px solid white",
                        width: "60%",
                      }}
                    >
                      <FaCalendar size={20} style={{ marginRight: "0.7em" }} />
                      <span className={styles.appointmenttext}>
                        {formatDay(item.bookingDate)},
                        {formatDate(item.bookingDate)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaClock size={20} style={{ marginRight: "0.7em" }} />
                      <span className={styles.appointmenttext}>
                        {showTime(item.bookingDate)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.topdiv}>
                    <div style={{ width: "88%" }}>
                      <p className={styles.hospitalname}>
                        {item.clinicId.clinicName}
                      </p>
                      <p className={styles.status}>
                        {item.clinicId.clinicContact}
                      </p>
                    </div>
                    <div style={{ width: "12%" }}>
                      <MdMyLocation
                        size={30}
                        onClick={() => getDirections(item.patientLocation)}
                      />
                    </div>
                  </div>
                  <br />
                  <div className={styles.topdiv}>
                    <div style={{ width: "50%" }}>
                      Check In Status:
                      <p
                        className={`${styles.status} ${
                          item.checkInStatus === "Confirmed"
                            ? styles.bookingStatusConfirmed
                            : styles.bookingStatusCancelled
                        }`}
                      >
                        {item.checkInStatus}
                      </p>
                    </div>
                    <div style={{ width: "50%" }}>
                      Booking Status:
                      <p
                        className={`${styles.status} ${
                          item.bookingStatus === "Booked"
                            ? styles.bookingStatusConfirmed
                            : styles.bookingStatusCancelled
                        }`}
                      >
                        {item.bookingStatus}
                      </p>
                    </div>
                  </div>
                  <div className={styles.topdiv}>
                    <span className={styles.eta}>ETA : 16 mins</span>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => cancelAppointment(item)}
                    >
                      Cancel
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
                  <div>Booking Status</div>
                  <div>Booking Date</div>
                  <div>Check In Status</div>
                  <div>Check In Date</div>
                  <div>Cancellation Date</div>
                  <div>Location</div>
                  <div></div>
                </header>

                {checkIns.map((item, index) => (
                  <div role="row" key={index} className={styles.tableData}>
                    <div className={styles.tableColumn}>
                      {item.clinicId.clinicName}
                    </div>
                    <div className={styles.tableColumn}>
                      {item.clinicId.clinicContact}
                    </div>
                    <div className={styles.tableColumn}>
                      <span
                        className={`${
                          item.bookingStatus === "Booked"
                            ? styles.confirm
                            : styles.cancel
                        }`}
                      >
                        {item.bookingStatus}
                      </span>
                    </div>
                    <div className={styles.tableColumn}>
                      {formatFullDate(item.bookingDate)}
                    </div>
                    <div className={styles.tableColumn}>
                      <span
                        className={`${
                          !item.checkInStatus
                            ? ""
                            : item.checkInStatus === "Checked In"
                            ? styles.confirm
                            : styles.cancel
                        }`}
                        style={{ marginLeft: "0.4em" }}
                      >
                        {item.checkInStatus ? item.checkInStatus : "-"}
                      </span>
                    </div>
                    <div className={styles.tableColumn}>
                      {item.checkInDate
                        ? formatFullDate(item.checkInDate)
                        : "-"}
                    </div>

                    <div className={styles.tableColumn}>
                      <span>
                        {item.bookingCancellationDate
                          ? formatFullDate(item.bookingCancellationDate)
                          : "-"}
                      </span>
                    </div>

                    <div className={styles.tableColumn}>
                      <button
                        className={styles.directionBtn}
                        onClick={() =>
                          getDirections(item.clinicId.clinicLocation)
                        }
                      >
                        <FaLocationArrow style={{ marginRight: "0.4em" }} />
                        Directions
                      </button>
                    </div>
                    <div>
                      {item.bookingStatus === "Booked" &&
                        !item.checkInStatus && (
                          <button
                            onClick={() => cancelAppointment(item)}
                            className={styles.cancelBtn}
                            title="Cancel Appointment"
                          >
                            Cancel
                          </button>
                        )}
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
}

export default UserAppointments;
