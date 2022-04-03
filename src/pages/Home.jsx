import React, { useEffect, useState } from "react";
import api from "../actions/api";
import ItemPlaceholder from "../components/ItemPlaceholder";

import { useNavigate } from "react-router-dom";

const Home = ({ amendCart, cart, user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    //On initial page load get products
    const getProducts = async () => {
      setLoading(true);
      const fetchedProducts = await api.getProducts();
      setProducts(fetchedProducts.data.products);
      setLoading(false);
    };

    //Check if the account is a business account and redirect if so.
    if (user?.userInfo.business) {
      navigate(`/business/${user?.userInfo.id}`);
    } else {
      getProducts();
    }

    return getProducts();
  }, [user, navigate]);

  if (loading) return <div>Loading..</div>;

  return (
    <div className="product-list">
      {products.map((product) => {
        return (
          <ItemPlaceholder
            product={product}
            amendCart={amendCart}
            key={product._id}
          />
        );
      })}
    </div>
  );
};

export default Home;
