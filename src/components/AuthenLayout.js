import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthenLayout = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const tokenExpiration = window.localStorage.getItem("");

  if (
    (token === null ||
      (tokenExpiration && Date.now() > parseInt(tokenExpiration))) &&
    window.location.pathname !== "/login"
  ) {
    window.localStorage.removeItem("token"); // Xóa token hết hạn
    window.localStorage.removeItem("tokenExpiration"); // Xóa thời gian hết hạn
    // window.location.href = "/login";
    navigate("/login");
  }

  return <Outlet />;
};

export default AuthenLayout;
