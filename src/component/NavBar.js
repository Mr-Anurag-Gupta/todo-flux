import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const activeStyle = {
    color: "#1064A3",
    textDecoration: "underline",
  };
  return (
    <nav className="nav">
      <NavLink activeStyle={activeStyle} className="nav-link" to="/" exact>
        Home
      </NavLink>
      <NavLink activeStyle={activeStyle} className="nav-link" to="/history">
        History
      </NavLink>
    </nav>
  );
};

export default NavBar;
