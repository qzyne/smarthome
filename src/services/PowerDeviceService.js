import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const getTotalEnergyByDeviceId = (id) => {
  return axios.get(`User/PowerDevice/${id}`, {
    headers: {
      Authorization: header,
    },
  });
};

const getTotalEnergy = () => {
  return axios.get(`User/PowerDevice/total-energy`, {
    headers: {
      Authorization: header,
    },
  });
};

export { getTotalEnergyByDeviceId, getTotalEnergy };
