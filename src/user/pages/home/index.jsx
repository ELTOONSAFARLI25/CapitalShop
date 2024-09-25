import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import homeCss from "../home/Home.module.css";
// Import Swiper styles
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
// Swiper modüllerini başlatıyoruz
SwiperCore.use([Autoplay]);
//mui icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import HelpIcon from "@mui/icons-material/Help";
//------------------
import { v4 as uuidv4 } from "uuid";
//------------------
import axios from "axios";
//-----swal sweet alert
import Swal from "sweetalert2";
import { HomeMax } from "@mui/icons-material";
function Home() {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  let wishlistArr;
  let localWishlistArr = JSON.parse(localStorage.getItem("wishlist"));
  if (localWishlistArr) {
    wishlistArr = localWishlistArr;
  } else {
    wishlistArr = [];
  }
  return (
    <>
      <title>Home | Capital Shop</title>{" "}
      <link rel="icon" href="src/favicon/favicon_shop.png" />
      <button
        className={homeCss.fixed_button}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ArrowUpwardIcon />
      </button>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          // Otomatik oynatma ayarları
          delay: 2500, // Slaytların kalma süresi (ms)
          disableOnInteraction: false, // Kullanıcı müdahalesinden sonra da devam etsin
        }}
      >
        <SwiperSlide className={homeCss.slide1}>
          <div className={homeCss.slide1_container}>
            {/* <div className={homeCss.imageSwipe1}>
              <img
                src="https://img.freepik.com/free-photo/high-fashion-portrait-young-beautiful-brunette-woman-wearing-nice-trendy-blue-suit-sexy-fashion-model-posing-studio-fashionable-female-isolated_158538-22180.jpg"
                alt=""
              />
            </div> */}
            <div className={homeCss.textSlide1}>
              <h3 style={{ color: "red", fontWeight: "100" }}>Fashion Sale</h3>
              <h1 style={{ letterSpacing: "5px" }}>Minimal Menz Style</h1>
              <p style={{ color: "gray" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reiciendis sint beatae, assumenda blanditiis eligendi possimus
                quos magni dolore sed ipsam!
              </p>
              <a href="/products">
                {" "}
                <button className={homeCss.shopnowBtn}>Shop now</button>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={homeCss.slide2}>
          <div className={homeCss.slide2_container}>
            <div className={homeCss.textSlide2}>
              <h3 style={{ color: "red", fontWeight: "100" }}>Fashion Sale</h3>
              <h1 style={{ letterSpacing: "5px" }}>Minimal Menz Style</h1>
              <p style={{ color: "gray" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reiciendis sint beatae, assumenda blanditiis eligendi possimus
                quos magni dolore sed ipsam!
              </p>
              <a href="/products">
                {" "}
                <button className={homeCss.shopnowBtn}>Shop now</button>
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className={homeCss.category_boxes}>
        <div className={`${homeCss.category_box} ${homeCss.category_box_men}`}>
          <div className={homeCss.category_title}>
            <h3 style={{ color: "white", fontWeight: "700" }}>Men's Fashion</h3>
            <a href="/products">Shop Now</a>
          </div>
        </div>{" "}
        <div
          className={`${homeCss.category_box} ${homeCss.category_box_women}`}
        >
          <div className={homeCss.category_title}>
            <h3 style={{ color: "white", fontWeight: "700" }}>
              Women's Fashion
            </h3>
            <a href="/products">Shop Now</a>
          </div>
        </div>{" "}
        <div
          className={`${homeCss.category_box} ${homeCss.category_box_jewellery}`}
        >
          <div className={homeCss.category_title}>
            <h3 style={{ color: "white", fontWeight: "700" }}>Jewellery</h3>
            <a href="/products">Shop Now</a>
          </div>
        </div>
      </div>
      <div className={homeCss.contianer_trends}>
        <div className={homeCss.trends_title}>
          <h1>Trending This Week</h1>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Jewellery</li>
            <li>Electronics</li>
          </ul>
        </div>
        <hr />
        <Swiper
          style={{ marginTop: "50px" }}
          spaceBetween={50}
          slidesPerView={4}
        >
          {products.map((elem) => {
            if (elem.rating.rate >= 4) {
              return (
                <SwiperSlide key={uuidv4()}>
                  <div className={homeCss.trends_swipe1_container}>
                    <div className={homeCss.trends_prod_img}>
                      <img src={elem.image} alt="" />
                      <div className={homeCss.trends_buttons}>
                        <button>
                          <AddShoppingCartIcon />
                        </button>
                        <button
                          id={elem.id}
                          onClick={(e) => {
                            let selected_data = products.find(
                              (elem) => elem.id == e.currentTarget.id
                            );
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
                    <div className={homeCss.trends_details}>
                      <h4>{elem.title.slice(0, 20)}</h4>
                      <p>${elem.price}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
      <div className={homeCss.swiper_customer}>
        <Swiper spaceBetween={50} slidesPerView={1}>
          <SwiperSlide>
            <div className={homeCss.swiper1_customer}>
              <div className={homeCss.swiper1_customer_container}>
                {" "}
                <h2>Customer Testimonial</h2>
                <p>AUFERTE MALUM EX VOBIS!!!</p>
                <div className={homeCss.customer_profile}>
                  <div className={homeCss.customer_profile_img}>
                    {" "}
                    <img
                      src="https://i.ytimg.com/vi/FIlVa65ribQ/hqdefault.jpg"
                      alt=""
                    />
                  </div>

                  <p>Tapinakcilar</p>
                </div>
              </div>
            </div>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <div className={homeCss.swiper1_customer}>
              <div className={homeCss.swiper1_customer_container}>
                {" "}
                <h2>Customer Testimonial</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Asperiores architecto, ipsa repellat dolor consectetur
                  dolorum.
                </p>
                <div className={homeCss.customer_profile}>
                  <div className={homeCss.customer_profile_img}>
                    {" "}
                    <img
                      src="https://i.ytimg.com/vi/FIlVa65ribQ/hqdefault.jpg"
                      alt=""
                    />
                  </div>

                  <p>...</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={homeCss.contianer_like}>
        <h1 style={{ textAlign: "center" }}>You May Like</h1>
        <Swiper
          style={{ marginTop: "50px" }}
          spaceBetween={50}
          slidesPerView={4}
          autoplay={{
            // Otomatik oynatma ayarları
            delay: 2500, // Slaytların kalma süresi (ms)
            disableOnInteraction: false, // Kullanıcı müdahalesinden sonra da devam etsin
          }}
        >
          {products.map((elem) => {
            if (elem.price < 100) {
              return (
                <SwiperSlide key={uuidv4()}>
                  <div className={homeCss.trends_swipe1_container}>
                    <div className={homeCss.trends_prod_img}>
                      <img src={elem.image} alt="" />
                      <div className={homeCss.trends_buttons}>
                        <button>
                          <AddShoppingCartIcon />
                        </button>
                        <button
                          id={elem.id}
                          onClick={(e) => {
                            let selected_data = products.find(
                              (elem) => elem.id == e.currentTarget.id
                            );
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
                    <div className={homeCss.trends_details}>
                      <h4>{elem.title.slice(0, 20)}</h4>
                      <p>${elem.price}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
      <div className={homeCss.latestNews}>
        <h1 style={{ textAlign: "center", paddingTop: "50px" }}>Latest News</h1>
        <div className={homeCss.container_latestNews}>
          {" "}
          <div className={homeCss.box}>
            <div className={homeCss.news_img}>
              <img
                src="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/blog1.jpg"
                alt=""
              />
            </div>
            <div className={homeCss.news_details}>
              {" "}
              <span style={{ color: "gray" }}>Fashion Tips</span>
              <h3 className={homeCss.news_title}>
                What Curling Irons Are The Best Ones
              </h3>
              <p style={{ color: "gray", wordSpacing: "10px" }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis nihil voluptate vero fugiat? Nesciunt, tempora.
              </p>
              <a
                href=""
                style={{
                  textDecoration: "underline",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Read More
              </a>
            </div>
          </div>{" "}
          <div className={homeCss.box}>
            <div className={homeCss.news_img}>
              <img
                src="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/blog2.jpg"
                alt=""
              />
            </div>
            <div className={homeCss.news_details}>
              {" "}
              <span style={{ color: "gray" }}>Fashion Tips</span>
              <h3 className={homeCss.news_title}>
                Vogue's Ultimate Guide To Autumn/ Winter 2019 Shoes
              </h3>
              <p style={{ color: "gray", wordSpacing: "10px" }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis nihil voluptate vero fugiat? Nesciunt, tempora.
              </p>
              <a
                href=""
                style={{
                  textDecoration: "underline",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Read More
              </a>
            </div>
          </div>{" "}
          <div className={homeCss.box}>
            <div className={homeCss.news_img}>
              <img
                src="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/blog3.jpg"
                alt=""
              />
            </div>
            <div className={homeCss.news_details}>
              {" "}
              <span style={{ color: "gray" }}>Fashion Tips</span>
              <h3 className={homeCss.news_title}>
                What Curling Irons Are The Best Ones
              </h3>
              <p style={{ color: "gray", wordSpacing: "10px" }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis nihil voluptate vero fugiat? Nesciunt, tempora.
              </p>
              <a
                href=""
                style={{
                  textDecoration: "underline",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={homeCss.categories_area}>
        <ul>
          <li>
            <LocalShippingIcon style={{ fontSize: "50px" }} />
            <h3>Fast & Free Delivery</h3>
            <p>Free delivery on all orders</p>
          </li>
          <li>
            <CreditScoreIcon style={{ fontSize: "50px" }} />
            <h3>Secure Payment</h3>
            <p>Free delivery on all orders</p>
          </li>
          <li>
            <CurrencyExchangeIcon style={{ fontSize: "50px" }} />
            <h3>Money Back Guarantee</h3>
            <p>Free delivery on all orders</p>
          </li>
          <li>
            <HelpIcon style={{ fontSize: "50px" }} />
            <h3>Online Supporty</h3>
            <p>Free delivery on all orders</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
