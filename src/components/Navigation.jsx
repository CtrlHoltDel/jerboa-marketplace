import React, { useContext } from "react";
import { UserContext } from "../context/User";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user, logout, cart } = useContext(UserContext);

  return (
    <div className="header__navigation">
      {user ? (
        <Button
          style={{ textDecoration: "none" }}
          text="logout"
          click={() => logout(null)}
          type="logout"
        />
      ) : (
        <Link style={{ textDecoration: "none" }} to="login-register">
          <Button text="Login/Register" type="login" />
        </Link>
      )}
      <Link style={{ textDecoration: "none" }} to="cart">
        <Button
          text={`cart ${cart.reduce((total, item) => {
            return total + item.count;
          }, 0)}`}
          type="cart"
        />
      </Link>
    </div>
  );
};

export default Navigation;
