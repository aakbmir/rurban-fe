export async function userLogin(data: any) {
  const res = await fetch(`http://localhost:8084/api/v1/auth/login`, {
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
  const res = await fetch(`http://localhost:8084/api/v1/auth/register-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: data["password"],
      contact: data["contact"],
      registerType: data["registerType"],
      location: data["location"],
    }),
  });
  if (!res.ok) {
    throw new Error("Cabin could not be Added");
  }
  return await res.json();
}

export async function RegisterEr(data: any) {
  const res = await fetch(`http://localhost:8084/api/v1/auth/register-er`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: data["password"],
      contact: data["contact"],
      registerType: data["registerType"],
      location: data["location"],
    }),
  });
  if (!res.ok) {
    throw new Error("Cabin could not be Added");
  }
  return await res.json();
}
