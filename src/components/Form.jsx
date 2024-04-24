// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoFormEmoji, setGeoFormEmoji] = useState();
  const [geoFormError, setGeoFormError] = useState("");

  const { loading, createCity } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;
    async function getCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoFormError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("Please select correct position. You are weird!!");
        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setGeoFormEmoji(data.countryCode);
      } catch (error) {
        setGeoFormError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    const newCity = {
      cityName: cityName,
      country: countryName,
      emoji: geoFormEmoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };
    await createCity(newCity);
    navigate("/app");
  }

  if (geoFormError) return <Message message={geoFormError} />;
  if (isLoadingGeoCoding) return <h1>Loading...</h1>;
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;
  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {geoFormEmoji !== undefined
            ? flagemojiToPNG(convertToEmoji(geoFormEmoji))
            : ""}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="MMM dd,YYYY"
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack type="back">&larr; Back</ButtonBack>
      </div>
    </form>
  );
}

export default Form;
