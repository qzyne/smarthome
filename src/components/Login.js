import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import loginImage from "../img/login.png";
import { Eye, EyeSlash } from "phosphor-react";
import { LoginApi } from "../services/AuthService";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.warning("All fields are required !");
    }
    try {
      let res = await LoginApi(username, password);
      if (res.data !== "") {
        window.localStorage.setItem("token", res.data.accessToken);

        const decodedToken = jwtDecode(res.data.accessToken);
        window.localStorage.setItem("tokenExpiration", decodedToken.exp * 1000);
        toast.success("Login success");
        navigate("/");
      }
      if (res.status === 400) {
        toast.error(res.data.message);
      }
    } catch (error) {
      // if (error.response.status === 400) {
      //   toast.warning("Email/Password is wrong");
      // }
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login-content">
        <h1 className="login-title">SMART HOME</h1>

        <div style={{ fontSize: "48px", marginTop: "1em", fontWeight: "bold" }}>
          Login now
        </div>
        <p style={{ fontSize: "20px" }}>Hi, Welcome back 👋</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye size={24} weight="bold" />
              ) : (
                <EyeSlash size={24} weight="bold" />
              )}
            </span>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>

      <img src={loginImage} alt="Login" className="login-image" />
    </div>
  );
};

export default Login;
