import axios from "axios";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (data) => {
  if (data !== null) {
    localStorage.setItem("rurban_cro_nm_ddn", data.data.data.name);
    localStorage.setItem("rurban_cro_id_ddi", data.data.data.id);
    localStorage.setItem("rurban_reg_type_unit", data.data.data.registerType);
    window.localStorage.setItem("auth_token", data.data.data.token);
  } else {
    clearAuthHeader();
  }
};

export function clearAuthHeader() {
  localStorage.removeItem("rurban_cro_nm_ddn");
  localStorage.removeItem("rurban_cro_id_ddi");
  localStorage.removeItem("rurban_reg_type_unit");
  window.localStorage.removeItem("auth_token");
}

const baseUrl = "https://rurban-be.onrender.com/";
axios.defaults.baseURL = "https://rurban-be.onrender.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const axiosRequestInterceptor = (method, url, data) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });
};

export async function fetchRequestInterceptor(method, url, data) {
  let headers = {};
  let body = {};
  console.log(getAuthToken());
  if (getAuthToken() !== null) {
    headers = {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    };

    if (data != null) {
      body = JSON.stringify(data);
    }
  }
  console.log(`inside final place ,,  ${baseUrl}${url}`);
  console.log(method);
  console.log(data);
  if (data != null) {
    return await fetch(`${baseUrl}${url}`, {
      headers,
      method,
      body,
    });
  } else {
    return await fetch(`${baseUrl}${url}`, {
      headers,
      method,
    });
  }
}
