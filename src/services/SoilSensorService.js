import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const getLastValue = () => {
  return axios.get("SoilHumidity/last-value", {
    headers: {
      Authorization: header,
    },
  });
};

const getAllValues = () => {
  return axios.get("SoilHumidity/all-values", {
    headers: {
      Authorization: header,
    },
  });
};

const getStatisticsInDay = (date) => {
  return axios.get(`SoilHumidity/statistics/day?date=${date}`, {
    headers: {
      Authorization: header,
    },
  });
};
const getStatisticsInWeek = (week, year) => {
  return axios.get(`SoilHumidity/statistics/week?week=${week}&year=${year}`, {
    headers: {
      Authorization: header,
    },
  });
};
const getStatisticsInMonth = (month, year) => {
  return axios.get(
    `SoilHumidity/statistics/month?month=${month}&year=${year}`,
    {
      headers: {
        Authorization: header,
      },
    }
  );
};

export {
  getAllValues,
  getLastValue,
  getStatisticsInDay,
  getStatisticsInMonth,
  getStatisticsInWeek,
};
