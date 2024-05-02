import { FaPhoneAlt } from "react-icons/fa";
import styles from "./UserAppointments.module.css";

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
import { useUserCheckInQuery } from "../../custom/useUserCheckInQuery";
import Spinner from "../common/Spinner";
import Empty from "../../ui/Empty";

const API_KEY = "5b3ce3597851110001cf62485841300cbc6947e0ae08e8fa3c83c194";

function UserAppointments({ records }) {
  const { isCheckInLoading, checkIns } = useUserCheckInQuery(records);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: cancelCheckIn,
    onSuccess: () => {
      toast.success("Check In Cancelled!");
      queryClient.invalidateQueries(["UserCheckIns"]);
    },
  });

  function cancelAppointment(item) {
    toast.success("cancellation in progress");
    mutateAsync(item.id);
  }

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

  return (
    <>
      <div className={styles.navTabName}>
        <span style={{ width: "80%" }}>Check Ins</span>
      </div>
      {isCheckInLoading ? (
        <Spinner />
      ) : !checkIns && checkIns.length === 0 ? (
        <Empty resourceName="Upcoming Check In" />
      ) : (
        <>
          <div className={styles.mobileNav}>
            <div className={styles.cardContainer}>
              {checkIns.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className={styles.checkInLeftDiv}>
                      <span className={styles.bookingDate}>
                        {formatDay(item.bookingDate)},{" "}
                        {formatDate(item.bookingDate)}
                      </span>
                      <span className={styles.checkInTime}>
                        {showTime(item.bookingDate)}
                      </span>
                    </div>
                    <div className={styles.checkInRightDiv}>
                      <div className={styles.clinicName}>
                        {item.clinicId.clinicName}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className={styles.checkInLeftDiv}>
                      <div className={styles.clinicContact}>
                        <FaPhoneAlt className={styles.icon} />
                        {item.clinicId.clinicContact}
                      </div>
                      {item.bookingStatus === "Booked" && (
                        <div className={styles.clinicContact}>
                          <span style={{ color: "red" }}>
                            ETA: {bookingDistances[index]?.duration} mins
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={styles.checkInRightDiv}>
                      <div
                        className={styles.clinicContact}
                        style={{ marginBottom: "8px" }}
                      >
                        Status:
                        <span
                          className={`${styles.bookingStatus} ${
                            item.bookingStatus === "Booked"
                              ? styles.bookingStatusConfirmed
                              : styles.bookingStatusCancelled
                          }`}
                        >
                          {item.bookingStatus}
                        </span>
                      </div>
                      {item.bookingStatus === "Booked" && (
                        <div style={{ marginBottom: "8px" }}>
                          <button
                            className={styles.cancelBtn}
                            onClick={() => cancelAppointment(item)}
                          >
                            Cancel Appointment
                          </button>
                        </div>
                      )}
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
                  <div>Booking Status</div>
                  <div>Booking Date</div>
                  <div>Cancellation Date</div>
                  <div>Check In Status</div>
                  <div>Check In Date</div>
                  <div>ETA</div>
                  <div></div>
                </header>

                {checkIns.map((item, index) => (
                  <div role="row" key={item.id} className={styles.tableData}>
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
                      <span className={styles.cancel}>
                        {item.bookingCancellationDate
                          ? formatFullDate(item.bookingCancellationDate)
                          : "-"}
                      </span>
                    </div>
                    <div
                      className={`${styles.tableColumn} ${
                        item.checkInStatus === "Confirmed"
                          ? styles.confirm
                          : styles.cancel
                      }`}
                    >
                      <span style={{ marginLeft: "0.4em" }}>
                        {item.checkInStatus}
                      </span>
                    </div>
                    <div className={styles.tableColumn}>
                      {item.checkInDate
                        ? formatFullDate(item.checkInDate)
                        : "-"}
                    </div>
                    <div className={styles.tableColumn}>
                      {bookingDistances[index]?.duration} mins
                    </div>
                    <div>
                      <button
                        onClick={() => cancelAppointment(item)}
                        className={styles.cancelBtnn}
                        title="Cancel Appointment"
                      >
                        <GiCancel size={20} color="red" />
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
}

export default UserAppointments;
