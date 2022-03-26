import React from "react";
import { formatPrice } from "../utils/utils";

const ItemPlaceholder = ({ product, amendCart, item }) => {
  const addItem = () => amendCart(product, "incriment");
  const removeItem = () => amendCart(product, "decrement");

  return (
    <div className="product-list__item" key={product._id}>
      <div>{product.name}</div>
      <img src={product.image_url} alt="" srcSet="" />
      <div>Price: {formatPrice(product.price)}</div>
      <div>Sold By: {product.sold_by}</div>
      <div>Brand: {product.brand}</div>
      <div>Category: {product.type}</div>
      <div>
        <button onClick={addItem}>add</button>
        <p>{item ? item.count : 0}</p>
        <button disabled={!item} onClick={removeItem}>
          remove
        </button>
      </div>
    </div>
  );
};

export default ItemPlaceholder;
