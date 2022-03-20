import axios from "axios";

const instance = axios.create({ baseURL: process.env.REACT_APP_TLD });

const api = {};

api.register = async (email, name, password) => {
  try {
    await instance.post("/register", { email, name, password });
  } catch (error) {
    return { error };
  }
};

api.login = async (email, password) => {
  try {
    const response = await instance.post("/login", { email, password });
    return response;
  } catch (error) {
    return { error };
  }
};

api.getProducts = async () => {
  try {
    const response = await instance.get("/products");
    return response;
  } catch (error) {
    return { error };
  }
};

export default api;
