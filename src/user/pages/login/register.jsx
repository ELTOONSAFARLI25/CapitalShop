import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import registerCss from "../login/Register.module.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Register() {
  const [users, setUsers] = useState([]); //users
  let navigate = useNavigate();
  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  //------------
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required!")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter!")
      .matches(/[A-Z]/, "Password must contain at least one capital letter!")
      .matches(/^[A-Za-z0-9]+$/, "Password must not contain symbols!")
      .matches(/\d/, "Password must contain at least one number!")
      .matches(/^\S*$/, "Password must not contain spaces!")
      .min(8, "Password must be at least 8 characters!"),
    cpassword: Yup.string()
      .required("Password repeat required!")
      .oneOf([Yup.ref("password"), null], "Passwords don't match!"),
  });
  return (
    <>
      <title>Register | Capital Shop</title>
      <div className={registerCss.container_login}>
        <div className={registerCss.login_head}>
          <h1>Sign Up</h1>
          <p>Create your account to get full access</p>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            cpassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            let user = {
              name: values.name,
              email: values.email,
              password: values.password,
              isAdmin: false,
            };
            if (!users.find((elem) => elem.email == values.email)) {
              axios.post("http://localhost:3000/users", user);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registered!",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                navigate("/");
              }, 1500);
              localStorage.setItem("logedUser", JSON.stringify(user));
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This email was already registered!",
              });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={registerCss.login_inputs}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "10px",
                    position: "absolute",
                  }}
                >
                  <label htmlFor="">
                    <h4>Full name</h4>
                  </label>
                  <Field
                    name="name"
                    placeholder="Enter full name"
                    type="text"
                    className={registerCss.input}
                  />{" "}
                  {errors.name && touched.name ? (
                    <i
                      style={{
                        color: "red",
                        fontSize: "13px",
                        marginTop: "-8px",
                      }}
                    >
                      {errors.name}
                    </i>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "10px",
                    position: "absolute",
                    top: "110px",
                  }}
                >
                  <label htmlFor="">
                    <h4>Username or Email Address</h4>
                  </label>
                  <Field
                    name="email"
                    placeholder="Username or Email Address"
                    type="email"
                    className={registerCss.input}
                  />{" "}
                  {errors.email && touched.email ? (
                    <i
                      style={{
                        color: "red",
                        fontSize: "13px",
                        marginTop: "-8px",
                      }}
                    >
                      {errors.email}
                    </i>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "start",
                    position: "absolute",
                    top: "225px",
                  }}
                >
                  {" "}
                  <label htmlFor="">
                    <h4>Password</h4>
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={registerCss.input}
                    placeholder="Enter password"
                  />
                  {errors.password && touched.password ? (
                    <i
                      style={{
                        color: "red",
                        fontSize: "13px",
                        marginTop: "-10px",
                      }}
                    >
                      {errors.password}
                    </i>
                  ) : null}
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "start",
                    position: "absolute",
                    top: "340px",
                  }}
                >
                  {" "}
                  <label htmlFor="">
                    <h4>Confirm password</h4>
                  </label>
                  <Field
                    name="cpassword"
                    type="password"
                    className={registerCss.input}
                    placeholder="Confirm password"
                  />
                  {errors.cpassword && touched.cpassword ? (
                    <i
                      style={{
                        color: "red",
                        fontSize: "13px",
                        marginTop: "-8px",
                      }}
                    >
                      {errors.cpassword}
                    </i>
                  ) : null}
                </div>
              </div>

              <div className={registerCss.foot}>
                <p>
                  Already have an account?{" "}
                  <a href="/login" style={{ color: "red" }}>
                    Login
                  </a>{" "}
                  here
                </p>
                <button type="submit">Sign up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Register;
