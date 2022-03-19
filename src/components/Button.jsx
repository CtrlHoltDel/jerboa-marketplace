import React from "react";
import { MdLogin, MdShoppingCart } from "react-icons/md";

const Button = ({ type, text, click }) => {
  const setIcon = () => {
    if (type === "login") return <MdLogin />;
    if (type === "cart") return <MdShoppingCart />;
  };

  return (
    <div className="generic-button" onClick={click}>
      <p>{text}</p>
      {setIcon()}
    </div>
  );
};

export default Button;
