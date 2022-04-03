import { useEffect, useState } from "react";
import ls from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import api from "../actions/api";

const useUser = (serverError) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loadingCart, setloadingCart] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedUser = ls.getUser();
    if (fetchedUser) setUser(fetchedUser);

    const checkCloudCart = async () => {
      setloadingCart(true);

      const fetchedCart = ls.getCart();

      if (fetchedUser) {
        const response = await api.getCart(fetchedUser.userInfo.token);
        if (response.error) serverError(response);
        setCart(response.cart);
      } else {
        console.log(fetchedCart);
        setCart(fetchedCart || []);
      }
      setloadingCart(false);
    };

    checkCloudCart();
  }, [serverError]);

  const login = (user, cart) => {
    console.log(user);
    ls.setUser(user);
    setCart(user.userInfo.cart);
    setUser(user);
    navigate(-1);
  };

  const logout = () => {
    ls.setUser(null);
    ls.setCart(null);
    setUser(null);
    setCart([]);
    navigate("/");
  };

  const amendCart = async (product, amount) => {
    if (amount === "empty") {
      setCart([]);
      return;
    }

    let updatedCart;

    if (user) {
      await api.amendCart(user.userInfo.token, product._id, amount);
    }

    if (amount >= 1) {
      //Add item
      setCart((curr) => {
        if (curr.find((prod) => prod._id === product._id)) {
          updatedCart = curr.map((p) =>
            p._id === product._id ? { ...p, count: p.count + amount } : p
          );
        } else {
          updatedCart = [{ ...product, count: amount }, ...curr];
        }

        if (!user) ls.setCart(updatedCart);

        return updatedCart;
      });
    } else {
      //Remove item
      setCart((curr) => {
        const currItem = curr.find((prod) => prod._id === product._id);
        if (currItem.count + amount <= 0) {
          updatedCart = curr.filter((p) => p._id !== product._id);
        } else {
          updatedCart = curr.map((p) => {
            if (p._id === product._id) {
              return { ...p, count: p.count + amount };
            } else {
              return p;
            }
          });
        }

        if (!user) ls.setCart(updatedCart);

        return updatedCart;
      });
    }
  };

  return { user, cart, logout, login, amendCart, loadingCart };
};

export default useUser;
