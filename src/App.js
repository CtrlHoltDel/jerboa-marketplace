import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginRegister from "./pages/LoginRegister";

import { UserContext } from "./context/User";
import { Routes, Route } from "react-router-dom";
import useUser from "./hooks/useUser";
import Error from "./pages/Error";

function App() {
  const { user, cart, logout, login, amendCart } = useUser();

  return (
    <UserContext.Provider value={{ user, logout, cart }}>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path={"/"}
            element={<Home amendCart={amendCart} cart={cart} />}
          />
          <Route
            path={"/cart"}
            element={<Cart cart={cart} amendCart={amendCart} />}
          />
          <Route
            path={"/login-register"}
            element={<LoginRegister login={login} user={user} />}
          />
          <Route path={"/error"} element={<Error />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
