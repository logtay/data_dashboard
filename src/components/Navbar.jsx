import React from "react";
import { Link } from "react-router-dom";
import spotifyLogo from "../assets/Spotify_Full_Logo_RGB_Black.png";

const Navbar = () => {
  return (
    <div className="navigation">
      <ul>

        <Link to="/" style={{ color: "#1e1e1e", textDecoration: 'none' }}><h1>Dashboard</h1></Link>
        <Link to="/about" style={{ color: "#1e1e1e", textDecoration: 'none' }}><h1>About</h1></Link>
      </ul>
        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
        <img src={spotifyLogo} alt="Spotify Logo" style={{ height: "70px", marginTop: "100px" }} />
      </a>
    </div>
  );
}

export default Navbar;