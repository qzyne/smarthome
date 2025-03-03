import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const uploadData = (requestBody) => {
  return axios.post("TempHumid", requestBody, {
    headers: {
      Authorization: header,
      "Content-Type": "application/json",
    },
  });
};

const getLastValue = () => {
  return axios.get("TempHumid/last-value", {
    headers: {
      Authorization: header,
    },
  });
};
const getAllValues = () => {
  return axios.get("TempHumid/all-values", {
    headers: {
      Authorization: header,
    },
  });
};

const getStatisticsInDay = (date) => {
  return axios.get(`TempHumid/statistics/day?date=${date}`, {
    headers: {
      Authorization: header,
    },
  });
};
const getStatisticsInWeek = (week, year) => {
  return axios.get(`TempHumid/statistics/week?week=${week}&year=${year}`, {
    headers: {
      Authorization: header,
    },
  });
};
const getStatisticsInMonth = (month, year) => {
  return axios.get(`TempHumid/statistics/month?month=${month}&year=${year}`, {
    headers: {
      Authorization: header,
    },
  });
};
export {
  uploadData,
  getAllValues,
  getLastValue,
  getStatisticsInDay,
  getStatisticsInMonth,
  getStatisticsInWeek,
};
