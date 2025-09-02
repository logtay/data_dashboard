import { Outlet, Link } from "react-router-dom";
import Header from "../src/components/Header";
import Navbar from "../src/components/Navbar";

const Layout = () => {
  return (
    <div>
              <div className="container">
        <div className="sidebar">
            <Header />  
            <Navbar />
        </div>
        <div className="data-container">
      <Outlet />
      </div>
      </div>
    </div>
  );
};

export default Layout;