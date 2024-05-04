import axios from "axios";
import bcrypt from "bcryptjs";

export async function userLogin(data: any) {
  const hashedPassword = bcrypt.hashSync(
    data["password"],
    "$2a$10$CwTycUXWue0Thq9StjUM0u"
  );

  return axios
    .post("https://rurban.onrender.com/api/v1/auth/login", {
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

export async function RegisterUser(data: any) {
  const hashedPassword = bcrypt.hashSync(
    data["password"],
    "$2a$10$CwTycUXWue0Thq9StjUM0u"
  );
  await axios
    .post("https://rurban.onrender.com/api/v1/auth/register-user", {
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
        throw new Error(error.response.data.error);
      }
    );
}

export async function RegisterEr(data: any) {
  const hashedPassword = bcrypt.hashSync(
    data["password"],
    "$2a$10$CwTycUXWue0Thq9StjUM0u"
  );
  await axios
    .post("https://rurban.onrender.com/api/v1/auth/register-er", {
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: hashedPassword,
      contact: data["contact"],
      registerType: data["registerType"],
      location: data["location"].toString(),
      website: data["website"],
    })
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        throw new Error(error.response.data.error);
      }
    );
}
