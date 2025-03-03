import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";

const AppLayout = () => {
  const navigate = useNavigate();
  if (
    window.localStorage.getItem("token") === null &&
    window.location.pathname !== "/login"
  ) {
    window.location.href = "/login";
    navigate("/login");
  }

  return (
    <div className="grid-container">
      <Menu />
      <Outlet />
    </div>
  );
};

export default AppLayout;
