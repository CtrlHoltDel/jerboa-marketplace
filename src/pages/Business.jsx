import React, { useEffect, useState } from "react";
import api from "../actions/api";

import { useNavigate } from "react-router-dom";

const Business = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateBusiness = async () => {
      setLoading(true);

      const response = await api.validateBusiness(user.userInfo);

      if (response) {
        setValidationError({
          error: "Unvalidated Account - Contact an administrator ",
        });
      }

      setLoading(false);
    };

    if (!user) {
      navigate("/");
      return;
    }

    validateBusiness();
  }, [navigate, user]);

  if (loading) return <div>Loading..</div>;
  if (validationError) return <div>{validationError.error}</div>;

  return <div>Business Page</div>;
};

export default Business;
