import axios from "axios";

const instance = axios.create({ baseURL: process.env.REACT_APP_TLD });

const api = {};

api.pingServer = async () => {
  try {
    await instance.get("/products");
  } catch (error) {
    return { error };
  }
};

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

api.getProduct = async (id) => {
  try {
    const { data } = await instance.get(`/product/${id}`);
    return data.product;
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

api.amendCart = async (token, id, amount) => {
  try {
    await instance.post(
      `/customer/cart`,
      {
        id,
        amount,
      },
      { headers: { authorisation: `Bearer ${token}` } }
    );
  } catch (error) {
    return { error };
  }
};

api.getCart = async (token) => {
  try {
    const { data } = await instance.get("/customer/cart", {
      headers: { authorisation: `Bearer ${token}` },
    });

    return { cart: data.cart.cart };
  } catch (error) {
    return { error: "Error getting cart" };
  }
};

export default api;
