import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import loadingIcon from "../assets/loading-animated.svg";
import api from "../actions/api";

const LoginRegister = ({ user, login }) => {
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const [type, setType] = useState("login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);

  const toggleLoginType = () => {
    setType(type === "login" ? "register" : "login");
    setMessage("");
    setError("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setEmailError(false);

    if (type === "login") {
      //Login
      if (!password || !email) {
        setError("Missing credentials");
        return;
      }

      setLoading(true);
      const body = await api.login(email, password);
      setLoading(false);

      if (body.error) {
        setError(
          body.error.response ? "Invalid credentials." : "Server error."
        );
        return;
      }
      setMessage("Authentication succesful - redirecting...");
      login(body.data);
    } else {
      //Register
      if (!name || !password || !confirmPassword || !email) {
        setError("Missing credentials");
        return;
      }

      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!emailRegex.test(email)) {
        setEmailError(true);
        setError("Invalid Email Format");
        return;
      }

      if (password.length < 6) {
        setError("Password Too Short");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);
      const body = await api.register(email, name, password);
      setLoading(false);

      if (body?.error) {
        setError(body.error.response.data);
        return;
      }

      setType("login");
      setMessage("Registered Succesfully! Please log in.");
      setName("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__form-container">
        <p className="login-page__form-container__error">{error}</p>
        <form action="" onSubmit={onSubmit}>
          {type === "register" && (
            <>
              <label htmlFor="login-name">Name</label>
              <input
                type="text"
                id="login-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </>
          )}
          <label htmlFor="login-email">Email</label>
          <input
            type="text"
            id="login-email"
            value={email}
            style={{ border: emailError ? "red solid 1px" : "black solid 1px" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="login-password">Password</label>
          <input
            type="text"
            id="login-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {type === "register" && (
            <>
              <label htmlFor="login-confirm_password">Confirm Password</label>
              <input
                type="text"
                id="login-confirm_password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </>
          )}
          <button>{type === "login" ? "Log in" : "Register"}</button>
        </form>
        <div className="login-page__form-container__toggle">
          <p onClick={toggleLoginType}>
            {type === "login"
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </p>
        </div>
        {loading && (
          <img className="login-page__form-container__icon" src={loadingIcon} />
        )}
      </div>
      {message && <div className="login-page__message">{message}</div>}
    </div>
  );
};

export default LoginRegister;
