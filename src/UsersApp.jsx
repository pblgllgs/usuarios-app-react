import { LoginPage } from "./auth/pages/LoginPage";
import { useAuth } from "./auth/hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";

export const UsersApp = () => {
  const { handlerLogin, handlerLogout, login } = useAuth();

  return (
    <Routes>
      {login.isAuth ? (
        <Route
          path="/*"
          element={<UserRoutes handlerLogout={handlerLogout} login={login} />}
        />
      ) : (
        <>
          <Route path="/login" element={<LoginPage handlerLogin={handlerLogin} />} />
          <Route path="/*" element={<Navigate to="/login" />}/>
        </> 
      )
    }
    </Routes>
  );
};
