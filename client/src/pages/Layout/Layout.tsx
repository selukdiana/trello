import { Outlet } from "react-router";
import { Header } from "../../layout/Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
