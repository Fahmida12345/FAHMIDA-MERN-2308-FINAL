import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/common/Sidebar";

const Rootlayouts = () => {
  return (
    <div className="flex items-start justify-between h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Rootlayouts;
