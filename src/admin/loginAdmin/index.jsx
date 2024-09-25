import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import loginCss from "../loginAdmin/LoginAdmin.module.css";
import { json, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginAdmin() {
  const [users, setUsers] = useState([]); //users

  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  let navigate = useNavigate();
  return (
    <>
      <title>Login-Admin Page | Capital Shop</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="https://e7.pngegg.com/pngimages/286/599/png-clipart-isometric-projection-shopping-building-store-isometric-graphics-in-video-games-and-pixel-art-property.png"
      />

      <div className={loginCss.container_login}>
        <div className={loginCss.login_head}>
          <h1>Admin</h1>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
            let find = false;
            users.forEach((elem) => {
              if (
                elem.email == values.email &&
                elem.password == values.password &&
                elem.isAdmin
              ) {
                find = true;
              }
            });
            if (find) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Welcome!",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                navigate("/admin-page");
              }, 1500);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password",
              });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={loginCss.login_inputs}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "10px",
                  }}
                >
                  <label htmlFor="">
                    <h3>Email Address</h3>
                  </label>
                  <Field
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    className={loginCss.input}
                  />{" "}
                  {errors.email && touched.email ? (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "start",
                  }}
                >
                  {" "}
                  <label htmlFor="">
                    <h3>Password</h3>
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={loginCss.input}
                    placeholder="Enter password"
                  />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red", fontSize: "13px" }}>
                      {errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={loginCss.foot}>
                <button type="submit">Log in</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default LoginAdmin;
