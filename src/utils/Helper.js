import { format } from "date-fns";

export function formatDay(dateObj) {
  return new Date(dateObj).toLocaleString("en", { weekday: "long" });
}

export function formatDate(dateObj) {
  var date = new Date(dateObj);
  var formattedDate = format(date, "MMM dd");
  return formattedDate;
}

export function formatDateFirst(dateObj) {
  var date = new Date(dateObj);
  var formattedDate = format(date, "dd MMMM");
  return formattedDate;
}

export function formatFullDate(dateObj) {
  var date = new Date(dateObj);
  var formattedDate = format(date, "MMM dd, yyyy hh:mm a");
  return formattedDate;
}

export function formatYearDate(dateObj) {
  var date = new Date(dateObj);
  var formattedDate = format(date, "dd/MM/yyyy");
  return formattedDate;
}

export function showTime(dateObj) {
  var date = new Date(dateObj);
  const showTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return showTime;
}

export function formatDateOfBirth(birthObj) {
  const year = birthObj.split("-")[0];
  const month = birthObj.split("-")[1];
  const day = birthObj.split("-")[2];
  return `${day}/${month}/${year}`;
}

export function calculateAge(dob) {
  var today = new Date();
  var birthDate = new Date(dob); // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
}
