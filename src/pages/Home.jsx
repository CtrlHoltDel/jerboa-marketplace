import React, { useEffect, useState } from "react";
import api from "../actions/api";
import ItemPlaceholder from "../components/ItemPlaceholder";

const Home = ({ amendCart, cart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const fetchedProducts = await api.getProducts();
      setProducts(fetchedProducts.data.products);
      setLoading(false);
    };

    getProducts();
  }, []);

  if (loading) return <div>Loading..</div>;

  return (
    <div className="product-list">
      {products.map((product) => {
        const item = cart.find((prod) => prod._id === product._id);
        return (
          <ItemPlaceholder
            product={product}
            amendCart={amendCart}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default Home;
