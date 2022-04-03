import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginRegister from "./pages/LoginRegister";

import { UserContext } from "./context/User";
import { Routes, Route } from "react-router-dom";
import useUser from "./hooks/useUser";
import Error from "./pages/Error";
import Business from "./pages/Business";
import Error404 from "./pages/Error404";
import useServerStatus from "./hooks/useServerStatus";
import { useState } from "react";
import Product from "./pages/Product";
import Company from "./pages/Company";

function App() {
  const [serverError, setServerError] = useState(false);

  const { loading } = useServerStatus(setServerError);
  const { user, cart, logout, login, amendCart, loadingCart } =
    useUser(setServerError);

  if (loading || loadingCart) return <div>Loading</div>;
  if (serverError) return <div>{serverError.error}</div>;

  return (
    <UserContext.Provider value={{ user, logout, cart }}>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path={"/"}
            element={<Home amendCart={amendCart} cart={cart} user={user} />}
          />
          <Route
            path={"/cart"}
            element={<Cart cart={cart} amendCart={amendCart} />}
          />
          <Route
            path={"/login-register"}
            element={<LoginRegister login={login} user={user} />}
          />
          <Route
            path={`/business/:businessId`}
            element={<Business user={user} />}
          />
          <Route path={"/company/:businessId"} element={<Company />} />
          <Route path={`/product/:productId`} element={<Product />} />
          <Route path={"/error"} element={<Error />} />
          <Route path={"/*"} element={<Error404 />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
