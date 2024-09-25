import React from "react";
import navCss from "../navbar/Navbar.module.css";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

function Navbar() {
  let logedUser = JSON.parse(localStorage.getItem("logedUser"));

  return (
    <>
      <div className={navCss.container}>
        <div className={navCss.elements}>
          <div className={navCss.logo}>
            {" "}
            <AddBusinessIcon
              style={{
                fontSize: "40px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "8px",
              }}
            />
            <Link to="/" className={navCss.link}>
              <span>
                <b>Capital</b> Shop
              </span>
            </Link>
          </div>
          <div className={navCss.links}>
            <ul>
              <li>
                <Link to="/" className={navCss.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className={navCss.link}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className={navCss.link}>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/contact" className={navCss.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className={navCss.buttons}>
            <div className={navCss.search}>
              {" "}
              <input type="text" className={navCss.searchInp} />
              <button>
                <SearchIcon />
              </button>
            </div>

            <Link
              to={logedUser ? "/account" : "/login"}
              className={navCss.link}
            >
              <PermIdentityIcon style={{ fontSize: "30px" }} />
            </Link>
            <Link to="/basket" className={navCss.link}>
              <ShoppingCartIcon style={{ fontSize: "30px" }} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
