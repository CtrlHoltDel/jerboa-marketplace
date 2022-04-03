import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/utils";

const ItemPlaceholder = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-list__item" key={product._id}>
      <div>{product.name}</div>
      <img src={product.image_url} alt="" srcSet="" />
      <div>Price: {formatPrice(product.price)}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => {
            navigate(`/product/${product._id}`);
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default ItemPlaceholder;
