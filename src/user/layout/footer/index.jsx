import React from "react";
import footerCss from "../footer/Footer.module.css";
//mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

//=-------------=
function Footer() {
  return (
    <>
      <div className={footerCss.footer_container}>
        <div className={footerCss.footer_head}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <h1>Subscribe Newsletter</h1>
            <p>Subscribe newsletter to get 5% on all products.</p>
          </div>
          <div className={footerCss.input}>
            {" "}
            <input type="text" placeholder="Enter your email" />
            <button className={footerCss.subs_btn}>Subscribe</button>
          </div>

          <div className={footerCss.icons_social}>
            <ul>
              <li>
                <a href="">
                  <button>
                    <FacebookIcon />
                  </button>
                </a>
              </li>
              <li>
                <a href="">
                  <button>
                    <InstagramIcon />
                  </button>
                </a>
              </li>
              <li>
                <a href="">
                  <button>
                    <YouTubeIcon />
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr style={{ width: "1300px", margin: "auto" }} />

        <div className={footerCss.footer_foot}>
          <i>
            Copyright ©2024 All rights reserved | This template is made with by
            Colorlib
          </i>
        </div>
      </div>
    </>
  );
}

export default Footer;
