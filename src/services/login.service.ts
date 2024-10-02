import axios from "axios";
import bcrypt from "bcryptjs";

const BASE_URL =
  "https://api.geoapify.com/v1/geocode/reverse?apiKey=aa97884829aa43358881863890a63f74";

export async function userLogin(data: any) {
  const hashedPassword = bcrypt.hashSync(
    data["password"],
    "$2a$10$CwTycUXWue0Thq9StjUM0u"
  );

  return axios
    .post("https://rurban-be.onrender.com/api/v1/auth/login", {
      username: data["username"],
      password: hashedPassword,
      registerType: data["registerType"],
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export async function resubmitVerificationEmail(email: any) {
  return axios
    .get(
      `https://rurban-be.onrender.com/api/v1/auth/resendVerificationEmail?email=${email}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export async function getCuuLoc() {
  return axios
    .get(`https://rurban-be.onrender.com/api/v1/data/status`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export async function RegisterUser(data: any) {
  const hashedPassword = bcrypt.hashSync(
    data["password"],
    "$2a$10$CwTycUXWue0Thq9StjUM0u"
  );
  await axios
    .post("https://rurban-be.onrender.com/api/v1/auth/register-user", {
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: hashedPassword,
      contact: data["contact"],
      registerType: data["registerType"],
      location: data["location"],
    })
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('errorrr : ', error);
        throw new Error(error.response.data.message);
      }
    );
}

export async function RegisterEr(data: any) {
  const hashedPassword = bcrypt.hashSync(
    data["password"],
    "$2a$10$CwTycUXWue0Thq9StjUM0u"
  );
  const lat = data["location"].toString().split(",")[0];
  const lng = data["location"].toString().split(",")[1];

  //&lat=55.340290092175515&lon=25.252149447573036&
  const res = await fetch(`${BASE_URL}&lat=${lat}&lon=${lng}`);
  //const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
  const dsss = await res.json();
  const address = dsss.features[0].properties.address_line2;
  // const address = dsss.locality
  //   .toString()
  //   .concat(", ")
  //   .concat(
  //     dsss.city.toString().concat(", ").concat(dsss.countryName.toString())
  //   );

  await axios
    .post("https://rurban-be.onrender.com/api/v1/auth/register-er", {
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: hashedPassword,
      contact: data["contact"],
      registerType: data["registerType"],
      location: data["location"].toString(),
      website: data["website"],
      address: address,
    })
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('errorrr : ', error);
        throw new Error(error.response.data.message);
      }
    );
}
