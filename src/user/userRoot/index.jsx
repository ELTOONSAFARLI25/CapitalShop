import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

function UserRoot() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserRoot;
