import axios from "axios";

export async function fetchClinics() {
  const res = await fetch(
    "https://rurban-be.onrender.com/api/v1/data/fetch-clinics",
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
    `https://rurban-be.onrender.com/api/v1/data/fetch-user-checkins?userId=${userId}&records=${records}`,
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
    `https://rurban-be.onrender.com/api/v1/data/create-checkin`,
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
    `https://rurban-be.onrender.com/api/v1/data/cancel-checkin?id=${id}`,
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
    `https://rurban-be.onrender.com/api/v1/data/fetch-hospital-checkins?clinicId=${clinicId}`,
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
    `https://rurban-be.onrender.com/api/v1/data/fetch-past-hospital-checkins?clinicId=${clinicId}`,
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
    `https://rurban-be.onrender.com/api/v1/data/clinic-checkin-update`,
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

export async function fetchEta(currentLocation: string, erLocation: string) {
  const userCurLat = currentLocation?.split(",")[0];
  const userCurLng = currentLocation?.split(",")[1];

  const erLat = erLocation?.split(",")[0];
  const erLng = erLocation?.split(",")[1];

  const api = "https://api.openrouteservice.org/v2/directions/driving-car?";
  const api_key =
    "api_key=5b3ce3597851110001cf62485841300cbc6947e0ae08e8fa3c83c194";
  const origin = "&start=" + userCurLng + "," + userCurLat;
  const destination = "&end=" + erLng + "," + erLat;
  const url = api + api_key + origin + destination;
  const res = await axios(url);
  console.log(url, new Date());
  if (res?.data?.features[0]?.properties?.summary?.duration) {
    return Math.floor(
      res?.data?.features[0]?.properties?.summary?.duration / 60
    );
  } else {
    return "NA";
  }
}

// function calculateETA(clinic, checkInDTO) {
//   try {
//       const res = axios(url);
//       try {
//           JSONObject geoResponse1 = new JSONObject(res);
//           JSONArray durations = geoResponse1.getJSONArray("durations");
//           Double duration = durations.getJSONArray(0).getDouble(0);
//       } catch (Exception e) {
//           System.out.println();
//       }

//       JSONObject geoResponse = new JSONObject(res);
//       JSONArray features = geoResponse.getJSONArray("features");
//       JSONObject feature = features.getJSONObject(0);
//       JSONObject properties = feature.getJSONObject("properties");
//       JSONObject summary = properties.getJSONObject("summary");
//       int duration = Integer.valueOf((int) summary.getDouble("duration") / 60);
//       return String.valueOf(duration);
//   } catch (Exception e) {
//       return "0";
//   }
// }
