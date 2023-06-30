/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";

export const UserRoutes = ({ handlerLogout, login }) => {
  return (
    <>
      <Navbar handlerLogout={handlerLogout} login={login} />
      <Routes>
        <Route path="users" element={<UsersPage />} />
        <Route path="/" element={<Navigate to="users" />} />
      </Routes>
    </>
  );
};
