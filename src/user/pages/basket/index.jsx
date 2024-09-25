import React from "react";
import basketCss from "../basket/Basket.module.css";
function Basket() {
  return (
    <>
      <title>Basket | Capital Shop</title>
      <div className={basketCss.container_basket}>
        <table>
          <thead className={basketCss.basket_head}>
            <th style={{ width: "60%" }}>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </thead>
          <tbody>
            <tr>
              <td>Prod</td>
              <td>$100</td>
              <td>
                <div className={basketCss.counter}>
                  <button className={basketCss.minus}>-</button>
                  <span>1</span>
                  <button className={basketCss.plus}>+</button>
                </div>
              </td>
              <td>$Total</td>
            </tr>
          </tbody>
        </table>
        <div className={basketCss.buttons}>
          <button>Contiune Shopping</button>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </>
  );
}

export default Basket;
