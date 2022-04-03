import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../actions/api";
import { formatPrice } from "../utils/utils";
import Error404 from "./Error404";

const Product = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currProduct, setCurrproduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async (id) => {
      const response = await api.getProduct(id);

      if (!response || response.error) setError(true);

      setCurrproduct(response);
      setLoading(false);
    };

    fetchProduct(productId);
  }, [productId]);

  if (loading) return <div>Loading</div>;
  if (error) return <Error404 />;

  const { name, price, type, sold_by, image_url, business_id, createdAt } =
    currProduct;

  return (
    <div>
      <p>{name}</p>
      <p>{formatPrice(price)}</p>
      <p>{type}</p>
      <p
        style={{ textDecoration: "underline", color: "blue" }}
        onClick={() => {
          navigate(`/company/${business_id}`);
        }}
      >
        {sold_by}
      </p>
      <img src={image_url} alt="" />
      <p>{createdAt}</p>
    </div>
  );
};

export default Product;
