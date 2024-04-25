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

export async function userRegister(data: any) {
  const res = await fetch(`https://rurban.onrender.com/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data["name"],
      dob: data["dob"],
      email: data["email"],
      password: data["password"],
      phone: data["phone"],
      registerType: data["registerType"],
      position: data["position"],
    }),
  });
  if (!res.ok) {
    throw new Error("Cabin could not be Added");
  }
  return await res.json();
}
