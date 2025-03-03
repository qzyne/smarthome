import axios from "axios";

const instance = axios.create({
  baseURL: "https://kimhuy-001-site1.ltempurl.com/api/",
});
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // console.log("<<< Check: ", error.data);
    if (error.response) {
      console.log("data: ", error.response.data);
      console.log("status: ", error.response.status);
      console.log("header: ", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("Request: ", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
