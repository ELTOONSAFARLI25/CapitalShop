import React from "react";
import adminNavbarCss from "../navbar/Navbar.module.css";
import { Link } from "react-router-dom";
function NavbarAdmin() {
  return (
    <>
      <div className={adminNavbarCss.container}>
        <ul>
          <li>
            <Link to="/admin-page/users" className={adminNavbarCss.link}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin-page/products" className={adminNavbarCss.link}>
              Products
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavbarAdmin;
