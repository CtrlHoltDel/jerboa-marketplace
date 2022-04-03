const USER = "USER";
const CART = "CART";

const ls = {};

ls.getUser = () => {
  const user = localStorage.getItem(USER);
  return JSON.parse(user);
};

ls.setUser = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

ls.getCart = () => {
  const user = localStorage.getItem(CART);
  return JSON.parse(user);
};

ls.setCart = (cart = []) => {
  localStorage.setItem(CART, JSON.stringify(cart));
};

export default ls;
