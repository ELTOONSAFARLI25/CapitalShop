import React, { useState } from "react";
import wishlistCss from "../wishlist/Wishlist.module.css";

//---------icons------
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//----------------------
//mui -----
import Alert from "@mui/material/Alert";
//-----

import { v4 as uuidv4 } from "uuid";
//-----swal sweet alert
import Swal from "sweetalert2";
import { NoEncryption } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
//---------------------
function Wishlist() {
  let wishlistArr = JSON.parse(localStorage.getItem("wishlist"));
  let navigate = useNavigate();
  const [wishlist, setWishlist] = useState(wishlistArr);
  return (
    <>
      {" "}
      {/* <div className="alert">
        <Alert severity="success">This is a success Alert.</Alert>
      </div> */}
      <title>Wishlist | Capital Shop</title>
      <div className={wishlistCss.container}>
        {" "}
        <div className={wishlistCss.cards}>
          {wishlistArr &&
            wishlistArr.map((elem) => {
              return (
                <div className={wishlistCss.card} key={uuidv4()} id={elem.id}>
                  <div className={wishlistCss.card_img}>
                    <img src={elem.image} alt="" />

                    <div
                      className={wishlistCss.favHeart}
                      style={{
                        display: "none",
                      }}
                    >
                      {" "}
                      <FavoriteIcon />
                    </div>

                    <div className={wishlistCss.card_buttons}>
                      {/* <button>
                      <AddShoppingCartIcon />
                    </button> */}
                      <button
                        id={elem.id}
                        onClick={(e) => {
                          let selected_data = wishlistArr.find(
                            (elem) => elem.id == e.currentTarget.id
                          );

                          wishlistArr = wishlistArr?.filter(
                            (elem) => elem.id != selected_data.id
                          );
                          // document.querySelector(".alert").style.display =
                          //   "block";

                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Product removed from favourites",
                            showConfirmButton: false,
                            timer: 1000,
                          });

                          setWishlist(wishlistArr);
                          localStorage.setItem(
                            "wishlist",
                            JSON.stringify(wishlistArr)
                          );
                        }}
                      >
                        <HighlightOffIcon />
                      </button>
                      <button
                        id={elem.id}
                        onClick={(e) => {
                          let selected_id = e.currentTarget.id;
                          navigate("/product-detail/" + selected_id);
                        }}
                      >
                        <ZoomInIcon />
                      </button>
                    </div>
                  </div>
                  <div className={wishlistCss.card_details}>
                    <h3>{elem.title.slice(0, 25)}</h3>
                    <p>
                      ${elem.price} | {elem.rating.rate} /5
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
