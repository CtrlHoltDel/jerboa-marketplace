import axios from "axios";

const instance = axios.create({ baseURL: process.env.REACT_APP_TLD });

const api = {};

api.register = async (email, name, password, business) => {
  try {
    await instance.post("/register", { email, name, password, business });
  } catch (error) {
    return { error };
  }
};

api.login = async (email, password, business) => {
  try {
    const response = await instance.post("/login", {
      email,
      password,
      business,
    });
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

api.validateBusiness = async ({ token, id }) => {
  try {
    await instance.get(`/business/validate/${id}`, {
      headers: { authorisation: `Bearer ${token}` },
    });
  } catch (error) {
    return { error };
  }
};

export default api;
