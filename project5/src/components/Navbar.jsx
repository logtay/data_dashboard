import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navigation">
      <ul>

        <Link to="/" style={{ color: "#1e1e1e", textDecoration: 'none' }}><h1>Dashboard</h1></Link>
        <Link to="/" style={{ color: "#1e1e1e", textDecoration: 'none' }}><h1>Search</h1></Link>
        <Link to="/about" style={{ color: "#1e1e1e", textDecoration: 'none' }}><h1>About</h1></Link>
      </ul>
    </div>
  );
}

export default Navbar;