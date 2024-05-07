export async function fetchClinics() {
  const res = await fetch(
    "https://rurban.onrender.com/api/v1/data/fetch-clinics",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Error while fetching Hospitals");
  }
  return await res.json();
}

export async function fetchCheckInsForUser(records: any) {
  const userId = localStorage.getItem("rurban_cro_id_ddi");
  const res = await fetch(
    `https://rurban.onrender.com/api/v1/data/fetch-user-checkins?userId=${userId}&records=${records}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Error while fetching upcoming check ins");
  }
  return await res.json();
}

export async function createCheckIn(data: any) {
  const res = await fetch(
    `https://rurban.onrender.com/api/v1/data/create-checkin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    throw new Error("" + res.status);
  }
  return await res.json();
}

export async function cancelCheckIn(id: any) {
  const res = await fetch(
    `https://rurban.onrender.com/api/v1/data/cancel-checkin?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Error while cancelling Check In ");
  }
  return await res.json();
}

export async function fetchHospitalCheckins() {
  const clinicId = localStorage.getItem("rurban_cro_id_ddi");
  const res = await fetch(
    `https://rurban.onrender.com/api/v1/data/fetch-hospital-checkins?clinicId=${clinicId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Error while fetching checkins");
  }
  return await res.json();
}

export async function fetchPastHospitalCheckins() {
  const clinicId = localStorage.getItem("rurban_cro_id_ddi");
  const res = await fetch(
    `https://rurban.onrender.com/api/v1/data/fetch-past-hospital-checkins?clinicId=${clinicId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Error while fetching checkins");
  }
  return await res.json();
}

export async function clinicCheckInUpdate(data: any) {
  const res = await fetch(
    `https://rurban.onrender.com/api/v1/data/clinic-checkin-update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    throw new Error("Error while cancelling Check In ");
  }
  return await res.json();
}
