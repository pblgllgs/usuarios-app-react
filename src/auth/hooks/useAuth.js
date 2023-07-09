import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAdmin, isAuth } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const handlerLogin = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      const user = { username: claims.username };
      dispatch(
        onLogin({
          user,
          isAdmin: claims.isAdmin,
        })
      );
      sessionStorage.setItem("token", `Bearer ${token}`);
      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user,
        })
      );
      navigate("/users");
      Swal.fire("Login", "Bienvenido", "success");
    } catch (e) {
      if (e.response?.status === 401) {
        Swal.fire(
          "Error de validación",
          "Username o password incorrectos",
          "error"
        );
      } else if (e.response?.status === 403) {
        Swal.fire("Error", "Permisos insuficientes", "error");
      } else {
        throw new Error();
      }
    }
  };

  const handlerLogout = () => {
    dispatch(onLogout());
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
    sessionStorage.clear();
  };
  return {
    handlerLogin,
    handlerLogout,
    login: { user, isAdmin, isAuth },
  };
};
