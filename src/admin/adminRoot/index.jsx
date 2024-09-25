import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../layout/navbar";

function AdminRoot() {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
    </>
  );
}

export default AdminRoot;
