export async function fetchHospitals() {
  const res = await fetch(
    "https://rurban.onrender.com/api/v1/data/fetch-hospitals",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res.ok);
  if (!res.ok) {
    throw new Error("Cabin could not be Added");
  }
  return await res.json();
}

export async function userRegister(data: any) {
  console.log("made a call", data);
  const res = await fetch("https://rurban.onrender.com/api/v1/auth/register", {
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
    }),
  });
  if (!res.ok) {
    throw new Error("Cabin could not be Added");
  }
  return await res.json();
}
