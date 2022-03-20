import { useEffect, useState } from "react";
import ls from "../utils/localStorage";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchedUser = ls.getUser();
    if (fetchedUser) setUser(fetchedUser);

    const fetchedCart = ls.getCart();
    if (fetchedCart) setCart(fetchedCart);
  }, []);

  const login = (user) => {
    ls.setUser(user);
    setUser(user);
  };

  const logout = () => {
    ls.setUser(null);
    setUser(null);
  };

  const amendCart = (product, operation) => {
    if (product === "empty") {
      setCart([]);
      return;
    }

    let updatedCart;
    if (operation === "incriment") {
      //Add item
      setCart((curr) => {
        if (curr.find((prod) => prod._id === product._id)) {
          updatedCart = curr.map((p) =>
            p._id === product._id ? { ...p, count: p.count + 1 } : p
          );
        } else {
          updatedCart = [{ ...product, count: 1 }, ...curr];
        }

        ls.updateCart(updatedCart);
        return updatedCart;
      });
    } else {
      //Remove item
      setCart((curr) => {
        const currItem = curr.find((prod) => prod._id === product._id);
        if (currItem.count === 1) {
          updatedCart = curr.filter((p) => p._id !== product._id);
        } else {
          updatedCart = curr.map((p) => {
            if (p._id === product._id) {
              return { ...p, count: p.count - 1 };
            } else {
              return p;
            }
          });
        }

        ls.updateCart(updatedCart);
        return updatedCart;
      });
    }
  };

  return { user, cart, logout, login, amendCart };
};

export default useUser;
