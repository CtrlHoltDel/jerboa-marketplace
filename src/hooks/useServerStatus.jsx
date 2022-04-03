import { useEffect, useState } from "react";
import api from "../actions/api";

const useServerStatus = (setServerError) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      setLoading(true);
      const response = await api.pingServer();
      if (response) setServerError({ error: "Server Error" });
      setLoading(false);
    };

    checkServerStatus();
  }, [setServerError]);

  return { loading };
};

export default useServerStatus;
