import { FaPhoneAlt } from "react-icons/fa";
import styles from "./CardList.module.css";
import { FaLocationDot } from "react-icons/fa6";

const hosImage =
  "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo=";
const patImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJmKSOQnjXM11pZ3TAzFEb88iy2fouGn-CI-1JI3ffQ&s";
const CardList = ({ dataList, feature }) => {
  function handleClick() {
    console.log("clicked");
  }
  return (
    <>
      <div className={styles.mobileNav}>
        <div className={styles.cardContainer}>
          {dataList.map((item, index) => (
            <div onClick={handleClick} key={index} className={styles.card}>
              <img
                alt="hospital"
                className={styles.imgImage}
                src={feature === "Hospital" ? patImage : hosImage}
              ></img>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.itemDesc}>
                  <h2>{item.name}</h2>
                  {item.phone ? (
                    <p className={styles.phone}>
                      <FaPhoneAlt className={styles.icon} />
                      {item.phone}
                    </p>
                  ) : (
                    <p className={styles.phone}>
                      <FaPhoneAlt className={styles.icon} />
                      Not Available
                    </p>
                  )}
                  {item.position ? (
                    <p>
                      <FaLocationDot className={styles.icon} />
                      {item.position}
                    </p>
                  ) : (
                    <p className={styles.phone}>
                      <FaLocationDot className={styles.icon} />
                      Not Available
                    </p>
                  )}
                </div>
                <div style={{ marginLeft: "3em" }}>
                  {feature === "Hospitals" && (
                    <button
                      style={{
                        marginRight: "1em",
                        marginTop: "2em",
                        marginBottom: "2em",
                        padding: "1em",
                        background: "#1a8efd",
                        border: "1px solid grey",
                        borderRadius: "6px",
                        color: "white",
                      }}
                    >
                      Book Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.desktopNav}>
        <div className={styles.cardContainer}>
          {dataList.map((item, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ width: "18em" }}>
                <img
                  alt="hospital"
                  className={styles.imgImage}
                  src={feature === "Hospital" ? patImage : hosImage}
                ></img>
              </div>

              <div className={styles.itemDesc}>
                <h2>{item.name}</h2>
                {item.phone ? (
                  <p className={styles.phone}>
                    <FaPhoneAlt className={styles.icon} />
                    {item.phone}
                  </p>
                ) : (
                  <p className={styles.phone}>
                    <FaPhoneAlt className={styles.icon} />
                    Not Available
                  </p>
                )}
                {item.position ? (
                  <p>
                    <FaLocationDot className={styles.icon} />
                    {item.position}
                  </p>
                ) : (
                  <p className={styles.phone}>
                    <FaLocationDot className={styles.icon} />
                    Not Available
                  </p>
                )}
              </div>
              <div className={styles.bookingDesc}>
                {feature === "Hospitals" && (
                  <button
                    style={{
                      marginRight: "1em",
                      marginTop: "2em",
                      marginBottom: "2em",
                      padding: "1em",
                      background: "#1a8efd",
                      border: "1px solid grey",
                      borderRadius: "6px",
                      color: "white",
                    }}
                  >
                    Book Appointment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;
