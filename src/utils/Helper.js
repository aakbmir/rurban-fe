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
  var formattedDate = format(date, "dd/MM/yyyy hh:mm a");
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
