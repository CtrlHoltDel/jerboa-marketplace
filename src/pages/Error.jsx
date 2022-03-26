import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Error = () => {
  const { error } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) navigate("/");
  }, [error, navigate]);

  return <div>{error}</div>;
};

export default Error;
