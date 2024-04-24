import { FaPhoneAlt } from "react-icons/fa";
import styles from "./CardList.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
const images = [
  // "https://toppng.com/uploads/preview/health-plan-icon-hospital-icon-blue-11553476430fckf2owtwt.png",
  // "https://static.vecteezy.com/system/resources/previews/010/371/644/non_2x/icon-hospital-suitable-for-education-symbol-blue-eyes-style-simple-design-editable-design-template-simple-illustration-vector.jpg",
  "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo=",
];
const CardList = ({ dataList }) => {
  function handleClick() {
    console.log("clicked");
  }
  return (
    <div className={styles.cardContainer}>
      {dataList.map((item, index) => (
        <div onClick={handleClick} key={index} className={styles.card}>
          <img
            className={styles.imgImage}
            src={images[index % images.length]}
          ></img>
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
            <p>
              <FaLocationDot className={styles.icon} />
              {item.address}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
