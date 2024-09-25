import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import detailPageCss from "../detailPage/DetailPage.module.css";
function DetailPage() {
  let id = useParams().id;
  const [prod, setProd] = useState({});
  useEffect(() => {
    axios("http://localhost:3000/products/" + id).then((res) => {
      setProd(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <title>{prod.title} | Capital Shop</title>
      <div className={detailPageCss.container_product}>
        <div className={detailPageCss.image}>
          <img src={prod.image} alt="" />
        </div>
        <div className={detailPageCss.container_details}>
          <div className={detailPageCss.details_head}>
            <h2>{prod.title}</h2>
            <p>{prod.category}</p>
          </div>
          <div className={detailPageCss.details_rating}>
            <h1>${prod.price}</h1>
            <p>
              {/* Rate: {prod.rating.rate} | {prod.rating.count} (count) */}
            </p>
            <button className={detailPageCss.add_to_cart_btn}>
              Add to cart
            </button>
          </div>
        </div>
        <div className={detailPageCss.desc_prod}>
          <h3>Description</h3>
          <h3>{prod.description}</h3>{" "}
        </div>
      </div>
    </>
  );
}

export default DetailPage;
