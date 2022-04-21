import { Outlet } from "react-router-dom";
import Navbar from "./navBar";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
