import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const getUser = () => {
  return axios.get("User", {
    headers: {
      Authorization: header,
    },
  });
};

const updateInfomation = (requestData) => {
  return axios.put("User/update-infomation", requestData, {
    headers: {
      Authorization: header,
      "Content-Type": "application/json",
    },
  });
};

const getDeviceById = (deviceId) => {
  return axios.get(`User/devices/${deviceId}`, {
    headers: {
      Authorization: header,
    },
  });
};

const updateDevice = (deviceId, deviceName, roomId, state) => {
  return axios.put(
    `User/devices/${deviceId}`,
    { deviceName: deviceName, roomId: roomId, state: state },
    {
      headers: {
        Authorization: header,
        "Content-Type": "application/json",
      },
    }
  );
};

const getAllDevices = () => {
  return axios.get(`User/devices`, {
    headers: {
      Authorization: header,
    },
  });
};

const addDevice = (deviceName, roomId, state) => {
  return axios.post(
    `User/devices`,
    { deviceName: deviceName, roomId: roomId, state: state },
    {
      headers: {
        Authorization: header,
        "Content-Type": "application/json",
      },
    }
  );
};

const changeStateDevice = (deviceId, state) => {
  return axios.put(
    `User/devices/${deviceId}/change-state?state=${state}`,
    {},
    {
      headers: {
        Authorization: header,
      },
    }
  );
};

const getOperatingTimeWorkingOfDevice = (deviceId) => {
  return axios.get(`User/devices/${deviceId}/states`, {
    headers: {
      Authorization: header,
    },
  });
};

const getAllOperatingTimeWorkingOfDevices = () => {
  return axios.get(`User/devices/states`, {
    headers: {
      Authorization: header,
    },
  });
};

const getAllActiveDevices = () => {
  return axios.get(`User/devices/active`, {
    headers: {
      Authorization: header,
    },
  });
};

const getTotalOperatingTimeWorkingInDayOfDevice = (deviceId, date) => {
  return axios.get(
    `User/devices/${deviceId}/totalOperatingWorkInDay?date=${date}`,
    {
      headers: {
        Authorization: header,
      },
    }
  );
};
const getTotalOperatingTimeWorkingInWeekOfDevice = (deviceId, week, year) => {
  return axios.get(
    `User/devices/${deviceId}/totalOperatingWorkInWeek?week=${week}&year=${year}`,
    {
      headers: {
        Authorization: header,
      },
    }
  );
};
const getTotalOperatingTimeWorkingInMonthOfDevice = (deviceId, month, year) => {
  return axios.get(
    `User/devices/${deviceId}/totalOperatingWorkInMonth?month=${month}&year=${year}`,
    {
      headers: {
        Authorization: header,
      },
    }
  );
};

const getTotalOperatingTimeWorkingInDayOfAllDevices = (date) => {
  return axios.get(`User/devices/totalOperatingWorkInDay?date=${date}`, {
    headers: {
      Authorization: header,
    },
  });
};
const getTotalOperatingTimeWorkingInWeekOfAllDevices = (week, year) => {
  return axios.get(
    `User/devices/totalOperatingWorkInDay?week=${week}&year=${year}`,
    {
      headers: {
        Authorization: header,
      },
    }
  );
};
const getTotalOperatingTimeWorkingInMonthOfAllDevices = (month, year) => {
  return axios.get(
    `User/devices/totalOperatingWorkInDay?month=${month}&year=${year}`,
    {
      headers: {
        Authorization: header,
      },
    }
  );
};

const deleteDevice = (deviceId) => {
  return axios.delete(`User/devices/${deviceId}`, {
    headers: {
      Authorization: header,
    },
  });
};
const getHistoryOfDevice = (deviceId, pageNumber) => {
  return axios.get(
    `User/devices/${deviceId}/history?pageNumber=${pageNumber}&pageSize=5`,
    {
      headers: {
        Authorization: header,
      },
    }
  );
};
export {
  deleteDevice,
  getUser,
  updateDevice,
  getAllDevices,
  getAllActiveDevices,
  getAllOperatingTimeWorkingOfDevices,
  getDeviceById,
  getOperatingTimeWorkingOfDevice,
  getTotalOperatingTimeWorkingInDayOfAllDevices,
  getTotalOperatingTimeWorkingInDayOfDevice,
  getTotalOperatingTimeWorkingInMonthOfAllDevices,
  getTotalOperatingTimeWorkingInMonthOfDevice,
  getTotalOperatingTimeWorkingInWeekOfAllDevices,
  getTotalOperatingTimeWorkingInWeekOfDevice,
  updateInfomation,
  addDevice,
  changeStateDevice,
  getHistoryOfDevice,
};
