import React, { useEffect, useState } from "react";
import { formatPrice } from "../utils/utils";

const ItemPlaceholder = ({ product, amendCart, cart }) => {
  const [currAmount, setCurrAmount] = useState(0);

  useEffect(() => {
    const inCart = cart.find((prod) => prod._id === product._id);

    if (inCart) {
      setCurrAmount(inCart.count);
    } else {
      setCurrAmount(0);
    }
  }, []);

  const addItem = () => {
    amendCart(product, "incriment");
    setCurrAmount((curr) => curr + 1);
  };
  const removeItem = () => {
    amendCart(product, "decrement");
    setCurrAmount((curr) => curr - 1);
  };

  return (
    <div className="product-list__item" key={product._id}>
      <div>{product.name}</div>
      <img src={product.image_url} alt="" srcset="" />
      <div>Price: {formatPrice(product.price)}</div>
      <div>Sold By: {product.sold_by}</div>
      <div>Brand: {product.brand}</div>
      <div>Category: {product.type}</div>
      <div>
        <button onClick={addItem}>add</button>
        <p>{currAmount}</p>
        <button disabled={currAmount === 0} onClick={removeItem}>
          remove
        </button>
      </div>
    </div>
  );
};

export default ItemPlaceholder;
