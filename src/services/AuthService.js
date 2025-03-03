import axios from "./AxiosCustom";

const LoginApi = (username, password) => {
  return axios.post("Auth/Login", { username, password });
};

const RegisterApi = (username, password, confirmPassword) => {
  return axios.post("Auth/Register", { username, password, confirmPassword });
};
export { LoginApi, RegisterApi };
