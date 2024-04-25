import axios from "axios";

export async function userLogin(data: any) {
  const res = await fetch(`https://rurban.onrender.com/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data["username"],
      password: data["password"],
      registerType: data["registerType"],
    }),
  });
  if (!res.ok) {
    throw new Error("Cabin could not be Added");
  }
  return await res.json();
}

export async function RegisterUser(data: any) {
  await axios
    .post("https://rurban.onrender.com/api/v1/auth/register-user", {
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: data["password"],
      contact: data["contact"],
      registerType: data["registerType"],
      location: data["location"],
    })
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error.response.data.error);
        throw new Error(error.response.data.error);
      }
    );
}

export async function RegisterEr(data: any) {
  await axios
    .post("https://rurban.onrender.com/api/v1/auth/register-er", {
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: data["password"],
      contact: data["contact"],
      registerType: data["registerType"],
      location: data["location"],
    })
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error.response.data.error);
        throw new Error(error.response.data.error);
      }
    );
}
