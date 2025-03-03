import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const addUserFace = (name, faceImage) => {
  return axios.post(
    `User/user-faces`,
    { name, faceImage },
    {
      headers: {
        Authorization: header,
        "Content-Type": "application/json",
      },
    }
  );
};

const getAllUserFaces = () => {
  return axios.get(`User/user-faces`, {
    headers: {
      Authorization: header,
      "Content-Type": "application/json",
    },
  });
};

const removeUserFace = (userFaceId) => {
  return axios.delete(`User/user-faces/${userFaceId}`, {
    headers: {
      Authorization: header,
    },
  });
};

const verifyUserFace = (requestData) => {
  return axios.post(`User/user-faces/verify`, requestData, {
    headers: {
      Authorization: header,
      "Content-Type": "application/json",
    },
  });
};
const getUserFaceById = (faceId) => {
  return axios.get(`User/user-faces/${faceId}`, {
    headers: {
      Authorization: header,
    },
  });
};

export {
  getAllUserFaces,
  getUserFaceById,
  addUserFace,
  verifyUserFace,
  removeUserFace,
};
