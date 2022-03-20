import React from "react";
import { formatPrice } from "../utils/utils";

const Cart = ({ cart, amendCart }) => {
  return (
    <div>
      {cart.length === 0 && <div>No items in cart</div>}
      {cart.map((item) => {
        return (
          <div>
            <p>{item.name}</p>
            <button
              onClick={() => {
                amendCart(item, "decrement");
              }}
            >
              -
            </button>
            <p>count: {item.count}</p>
            <button
              onClick={() => {
                amendCart(item, "incriment");
              }}
            >
              +
            </button>
            <p>price: {formatPrice(item.price * item.count)}</p>
          </div>
        );
      })}
      <div>
        Total cost:{" "}
        {formatPrice(
          cart.reduce((total, item) => total + item.price * item.count, 0)
        )}
      </div>
    </div>
  );
};

export default Cart;
