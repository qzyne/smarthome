import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const addIrrigationSchedule = (requestData) => {
  return axios.post("IrrigationSchedule", requestData, {
    headers: {
      Authorization: header,
      "Content-Type": "application/json",
    },
  });
};
const getIrrigationSchedule = () => {
  return axios.get("IrrigationSchedule", {
    headers: {
      Authorization: header,
    },
  });
};

const activeSchedule = (scheduleId) => {
  return axios.put(`IrrigationSchedule/${scheduleId}/handle-active`, {
    headers: {
      Authorization: header,
    },
  });
};
const changeTimeworkingSchedule = (scheduleId) => {
  return axios.put(`IrrigationSchedule/${scheduleId}/change-timeworking`, {
    headers: {
      Authorization: header,
    },
  });
};
export {
  getIrrigationSchedule,
  activeSchedule,
  changeTimeworkingSchedule,
  addIrrigationSchedule,
};
