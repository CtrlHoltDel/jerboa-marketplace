import { useState } from "react";
import Header from "./components/Header";
import { UserContext } from "./context/User";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginRegister from "./pages/LoginRegister";

function App() {
  const [user, setUser] = useState({ username: "test" });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, logout }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/login-register"} element={<LoginRegister />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
