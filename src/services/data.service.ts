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

export async function fetchPatients() {
  const res = await fetch(
    "https://rurban.onrender.com/api/v1/data/fetch-patients",
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
