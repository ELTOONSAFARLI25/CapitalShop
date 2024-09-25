import React, { useEffect, useState } from "react";
import productCss from "../products/Products.module.css";
//icons------------
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
//-----------------
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
//-------------------
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FormControlContext from "@mui/material/FormControl/FormControlContext";
import { useNavigate } from "react-router-dom";

//-----swal sweet alert
import Swal from "sweetalert2";
import { NoEncryption } from "@mui/icons-material";
//---------------------
function ProductsUser() {
  const [products, setProducts] = useState([]);
  const [dataProd, setDataProd] = useState([]);
  useEffect(() => {
    axios("http://localhost:3000/products/").then((res) => {
      setProducts(res.data);
      setDataProd(res.data);
    });
  }, []);

  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
    if (event.target.value != "all") {
      let newProds = dataProd.filter(
        (elem) => elem.category == event.target.value
      );
      setProducts(newProds);
    } else {
      setProducts(dataProd);
    }
  };
  let navigate = useNavigate();

  let wishlistArr;
  let localWishlistArr = JSON.parse(localStorage.getItem("wishlist"));
  if (localWishlistArr) {
    wishlistArr = localWishlistArr;
  } else {
    wishlistArr = [];
  }
  let basketArr;
  let localBasketArr = JSON.parse(localStorage.getItem("basket"));
  if (localBasketArr) {
    basketArr = localBasketArr;
  } else {
    basketArr = [];
  }
  const [selectedData, setSelectedData] = useState({});
  return (
    <>
      <title>Products | Capital Shop</title>
      <div className={productCss.container}>
        <div className={productCss.category_bar}>
          <Box sx={{ minWidth: 100, maxWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
                onChange={handleChange}
                style={{ borderRadius: "40px" }}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"men's clothing"}>Men</MenuItem>
                <MenuItem value={"women's clothing"}>Women</MenuItem>
                <MenuItem value={"jewelery"}>Jewellery</MenuItem>
                <MenuItem value={"electronics"}>Electronics</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className={productCss.cards}>
          {products &&
            products.map((elem) => {
              return (
                <div className={productCss.card} key={uuidv4()} id={elem.id}>
                  <div className={productCss.card_img}>
                    <img src={elem.image} alt="" />

                    <div
                      className={productCss.favHeart}
                      style={{
                        display: "none",
                      }}
                    >
                      {" "}
                      <FavoriteIcon />
                    </div>

                    <div className={productCss.card_buttons}>
                      <button
                        id={elem.id}
                        onClick={(e) => {
                          console.log(e.currentTarget.id);
                          let selected_prod = dataProd.find(
                            (elem) => elem.id == e.currentTarget.id
                          );
                          if (basketArr.find(elem))
                            // basketArr.push(selected_prod);
                            console.log(basketArr);
                        }}
                      >
                        <AddShoppingCartIcon />
                      </button>
                      <button
                        id={elem.id}
                        onClick={(e) => {
                          let selected_data = products.find(
                            (elem) => elem.id == e.currentTarget.id
                          );
                          setSelectedData(selected_data);
                          if (
                            wishlistArr.find(
                              (elem) => elem.id == selected_data.id
                            )
                          ) {
                            wishlistArr = wishlistArr.filter(
                              (elem) => elem.id != selected_data.id
                            );
                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Product removed from favourites",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            // document.querySelector(".favHeart").display =
                            //   "none";
                          } else {
                            wishlistArr.push(selected_data);
                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Product added to favourites",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          }
                          localStorage.setItem(
                            "wishlist",
                            JSON.stringify(wishlistArr)
                          );
                        }}
                      >
                        {" "}
                        {/* {wishlistArr.find(
                          (elem) => elem.id == selectedData.id
                        ) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )} */}
                        <FavoriteBorderIcon />
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
                  <div className={productCss.card_details}>
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

export default ProductsUser;
