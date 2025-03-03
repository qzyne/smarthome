import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const addRoom = (roomName) => {
  return axios.post(
    "User/rooms",
    { roomName },
    {
      headers: {
        Authorization: header,
        "Content-Type": "application/json",
      },
    }
  );
};

const getAllRooms = () => {
  return axios.get("User/rooms", {
    headers: {
      Authorization: header,
    },
  });
};

const getRoomById = (roomId) => {
  return axios.get(`User/rooms/${roomId}`, {
    headers: {
      Authorization: header,
    },
  });
};

const getAllDevicesInRoom = (roomId) => {
  return axios.get(`User/rooms/${roomId}/devices`, {
    headers: {
      Authorization: header,
    },
  });
};

const deleteRoom = (roomId) => {
  return axios.delete(`User/rooms/${roomId}`, {
    headers: {
      Authorization: header,
    },
  });
};

const addDeviceIntoRoom = (roomId, deviceId) => {
  return axios.post(`User/rooms/${roomId}/devices/${deviceId}`, {
    headers: {
      Authorization: header,
    },
  });
};

const removeDeviceFromRoom = (roomId, deviceId) => {
  return axios.delete(`User/rooms/${roomId}/devices/${deviceId}`, {
    headers: {
      Authorization: header,
    },
  });
};

const getTotalDevicesInRoom = (roomId) => {
  return axios.get(`User/rooms/${roomId}/devices/amount`, {
    headers: {
      Authorization: header,
    },
  });
};

const getActiveDevicesInRoom = (roomId) => {
  return axios.get(`User/rooms/${roomId}/devices/active`, {
    headers: {
      Authorization: header,
    },
  });
};
const updateRoomName = (roomId, roomName) => {
  return axios.put(
    `User/rooms/${roomId}`,
    { roomName },
    {
      headers: {
        Authorization: header,
      },
    }
  );
};
export {
  addRoom,
  getAllRooms,
  getRoomById,
  getAllDevicesInRoom,
  getTotalDevicesInRoom,
  getActiveDevicesInRoom,
  deleteRoom,
  removeDeviceFromRoom,
  addDeviceIntoRoom,
  updateRoomName,
};
