import React from "react";
import contactCss from "../contact/Contact.module.css";
//------------icons---------
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
//--------------------------

function Contact() {
  return (
    <>
      <title>Contact | Capital Shop</title>{" "}
      <div style={{ width: "1300px", margin: "auto", marginTop: "100px" }}>
        <h1>
          Get in Touch{" "}
          <div className={contactCss.container}>
            <div className={contactCss.form_inputs}>
              <textarea
                name=""
                id=""
                className={contactCss.message}
                placeholder="Enter Message"
              ></textarea>

              <div
                style={{
                  display: "flex",
                  width: "800px",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                <input
                  type="text"
                  className={contactCss.name}
                  placeholder="Enter name"
                />
                <input
                  type="text"
                  className={contactCss.email}
                  placeholder="Enter email"
                />
              </div>

              <input
                type="text"
                className={contactCss.subject}
                placeholder="Enter subject"
              />
              <button className={contactCss.send_btn}>Send</button>
            </div>
            <div className={contactCss.contact_details}>
              <div
                style={{
                  display: "flex",
                  height: "100px",
                  gap: "25px",
                  padding: "20px",
                }}
              >
                <HomeIcon style={{ fontSize: "40px" }} />
                <div style={{ textAlign: "start" }}>
                  <p>Buttonwood, California</p>
                  <span>Rosemead, CA 91770</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "100px",
                  padding: "20px",
                  gap: "25px",
                }}
              >
                <PhoneAndroidIcon style={{ fontSize: "40px" }} />
                <div style={{}}>
                  <p>+1 253 565 2365</p>
                  <span>Mon to Fri 9am to 6pm</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "100px",
                  gap: "25px",
                  padding: "20px",
                }}
              >
                <EmailIcon style={{ fontSize: "40px" }} />
                <div style={{ textAlign: "start" }}>
                  <p>support@colorlib.com</p>
                  <span>Send us your query anytime!</span>
                </div>
              </div>
            </div>
          </div>
        </h1>
      </div>
    </>
  );
}

export default Contact;
