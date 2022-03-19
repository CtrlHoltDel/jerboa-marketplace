import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import Search from "./Search";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div>Jerboa</div>
      </Link>
      <Search />
      <Navigation />
    </header>
  );
};

export default Header;
